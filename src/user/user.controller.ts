import { Controller, Get, Request, UseGuards, Post, Body, Req, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/guards/jwt.guard";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }


    @UseGuards(JwtAuthGuard)
    @Get("profile")
    signInWithOauth(
        @Request() req
    ) {
        return this.userService.getProfile(req);
    }


    @UseGuards(JwtAuthGuard)
    @Put("update")
    updateProfile(
        @Body() body,
        @Req() req,
    ) {
        return this.userService.updateProfile(body, req.user);
    }
}
