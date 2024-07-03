import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from './user.service';
import { JwtPayload } from 'jsonwebtoken';
// import { JwtPayload } from './jwt-payload.interface';
// import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yourSecretKey', // Use a config service to manage secrets
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneByUsernameOrEmail(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
