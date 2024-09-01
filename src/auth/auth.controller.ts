import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post("googleOauth")
    signInWithOauth(
        @Body() body
    ) {
        return this.authService.signInWithOauth(body);
    }
}
