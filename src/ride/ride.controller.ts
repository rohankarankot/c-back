import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Get("getride")
    getride(
        @Query() req
    ) {
        return this.rideService.getRides(req);
    }


    @UseGuards(JwtAuthGuard)
    @Get("myrides")
    myRides(
        @Req() req,
        @Query() query
    ) {
        return this.rideService.myRides(req.user, query);
    }

    @UseGuards(JwtAuthGuard)
    @Get("joinrequest")
    requestRide(
        @Req() req,
        @Query() query
    ) {
        return this.rideService.requestToJoinRide(req.user, query);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("completeride")
    completeRide(
        @Req() req,
        @Query() query
    ) {
        return this.rideService.completeRide(req.user, query);
    }
}
