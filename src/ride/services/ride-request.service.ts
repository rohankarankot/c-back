import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { asyncErrorWrapper } from 'src/helpers/asyncErrorWrapper';
import { Ride } from 'src/schema/ride.schema';
import { User } from 'src/schema/user.schema';

export class RideRequestService {
    constructor(private readonly rideModel: Model<Ride>) { }

    myRides = asyncErrorWrapper(async (user: User, query): Promise<any> => {
        const { active } = query;
        let rides = await this.rideModel.find({ createdBy: user.id, active: !!active }).exec();

        if (!rides.length) {
            throw new NotFoundException('No rides available');
        }

        return rides;
    })


    requestToJoinRide = asyncErrorWrapper(async (user: User, rideId: string): Promise<any> => {
        // Find the ride by ID
        const ride = await this.rideModel.findById(rideId).exec();
        if (!ride) {
            throw new NotFoundException('Ride not found');
        }

        // Check if the ride is full
        if (ride.joinedUsers.length >= ride.maxCapacity) {
            throw new BadRequestException('Ride is at full capacity');
        }

        // Check if user is already joined
        if (ride.joinedUsers.includes(user.id)) {
            throw new BadRequestException('User has already joined this ride');
        }

        // Add the user to the ride's joinedUsers array
        ride.joinedUsers.push(user.id);

        // Save the updated ride
        await ride.save();

        return { message: 'Successfully joined the ride' };
    });


}
