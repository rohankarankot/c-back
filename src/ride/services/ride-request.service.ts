import { NotFoundException } from '@nestjs/common';
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
}
