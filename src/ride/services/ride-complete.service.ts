import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { asyncErrorWrapper } from 'src/helpers/asyncErrorWrapper';
import { Ride } from 'src/schema/ride.schema';
import { User } from 'src/schema/user.schema';

export class RideCompleteService {
    constructor(private readonly rideModel: Model<Ride>) { }

    completeRide = asyncErrorWrapper(async (user: User, query) => {
        const { status, id } = query;
        let rides = await this.rideModel.findByIdAndUpdate(
            { createdBy: user.id, _id: id },
            { $set: { active: false, status } },
        ).exec();

        if (!rides) {
            throw new NotFoundException('No rides found for the specified city');
        }

        return { message: "task updated Successfully" };
    });
}
