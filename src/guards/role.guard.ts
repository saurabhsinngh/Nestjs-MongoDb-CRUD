import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RolesGuards implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        console.log("requiredRoles:::::", requiredRoles);
        if(!requiredRoles) return true;

        const required = context.switchToHttp().getRequest();
        const user = required.user;

        console.log("user?.role:::::", user?.role);
        return matchesRoles(requiredRoles, user?.role)
    }
}

    function matchesRoles(requiredRoles: string[], userRoles: string[]){
        return requiredRoles.some((role: string) => userRoles.includes(role));
    }