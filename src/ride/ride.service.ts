import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from 'src/schema/ride.schema';
import { RideCreateService } from './services/ride-create.service';
import { RideQueryService } from './services/ride-query.service';
import { RideCompleteService } from './services/ride-complete.service';
import { User } from 'src/schema/user.schema';
import { RideRequestService } from './services/ride-request.service';

@Injectable()
export class RideService {
    private rideCreateService: RideCreateService;
    private rideQueryService: RideQueryService;
    private rideCompleteService: RideCompleteService;
    private rideRequestService: RideRequestService;

    constructor(
        @InjectModel(Ride.name) private readonly rideModel: Model<Ride>,
    ) {
        this.rideCreateService = new RideCreateService(this.rideModel);
        this.rideQueryService = new RideQueryService(this.rideModel);
        this.rideCompleteService = new RideCompleteService(this.rideModel);
        this.rideRequestService = new RideRequestService(this.rideModel);
    }

    createNewRide(body: any, user: any) {
        return this.rideCreateService.createNewRide(body, user);
    }

    getRides(query) {
        return this.rideQueryService.getRides(query);
    }

    myRides(user: User, query) {
        return this.rideRequestService.myRides(user, query);
    }
    requestToJoinRide(user: User, query) {
        return this.rideRequestService.requestToJoinRide(user, query.rideId);
    }

    completeRide(user: any, query: any) {
        return this.rideCompleteService.completeRide(user, query);
    }
}
