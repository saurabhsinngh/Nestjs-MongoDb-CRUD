import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/schamas/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        // When we call call super inside the constructor It will calls or invokes the parent class costructor in this case parent class is PassportStrategy)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload) {
        let { id } = payload;
        let user = await this.userModel.findById(id)

        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint');
        }

        return user;
    }
}

