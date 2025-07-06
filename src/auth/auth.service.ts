import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schamas/user.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dto/signup.dto';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUpUser(signUpDto: SignUpDto): Promise<{ token: string }> {
        let { name, email, password } = signUpDto;
        let hashedPassword = await bcrypt.hash(password, 10);
        let dataToUserSignUp = { name, email, password: hashedPassword }

        let user = await this.userModel.create(dataToUserSignUp);

        let token = this.jwtService.sign({ id: user._id })
        return { token }
    }

    async loginUser(loginDto: LoginDto): Promise<{ token: string }> {
        let { email, password } = loginDto;
        let user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('User does not exists');
        }

        let isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            throw new UnauthorizedException('Please enter the correct password');
        }

        let token = this.jwtService.sign({ id: user._id })
        return { token }
    }
}
