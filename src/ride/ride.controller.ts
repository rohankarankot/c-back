import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('ride')
export class RideController {
    constructor(private readonly rideService: RideService) { }

    @UseGuards(JwtAuthGuard)
    @Post("createRide")
    createNewRide(
        @Body() body,
        @Req() req,
    ) {
        return this.rideService.createNewRide(body, req.user);
    }
}
