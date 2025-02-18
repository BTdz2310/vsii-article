import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commonService: CommonService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKey: commonService.getPublicKey(),
      // secretOrKeyProvider: async (_, rawJwtToken, done) => {
      //   try {
      //     const publicKey = await commonService.getPublicKey();
      //     done(null, publicKey);
      //   } catch (err) {
      //     done(err);
      //   }
      // },
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      role: payload.role,
      avatar: payload.avatar,
      id: payload.id,
    };
  }
}
