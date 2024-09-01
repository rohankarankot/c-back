import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { User } from "src/schema/user.schema";
import { Model } from 'mongoose';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    private readonly googleClient: OAuth2Client;

    constructor(
        @InjectModel(User.name) private readonly User: Model<User>,
        private readonly jwtService: JwtService,
    ) {
        this.googleClient = new OAuth2Client();
    }

    async signInWithOauth(body: { id_token: string }) {
        try {
            let token, user;
            if (!body.id_token) {
                throw new Error("Invalid token payload");
            }
            const ticket = await this.googleClient.verifyIdToken({
                idToken: body.id_token,
            });

            const payload: TokenPayload | undefined = ticket.getPayload();
            console.log('payload: ', payload);

            user = await this.User.findOne({
                email: payload.email,
            });
            if (user) {
                token = this.jwtService.sign({
                    id: user._id,
                });
            } else {
                const user = new this.User({
                    email: payload.email,
                    firstName: payload?.given_name,
                    lastName: payload?.family_name,
                    avatar: payload?.picture
                });
                await user.save();
                console.log('user: ', user);
                token = this.jwtService.sign({
                    id: user._id,
                });
            }

            return { token, user };
        } catch (error) {
            console.log('error:~~~~~~~~> ', error);
            throw new Error("Invalid token payload");
        }
    }
}
