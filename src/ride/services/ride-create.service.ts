import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { asyncErrorWrapper } from 'src/helpers/asyncErrorWrapper';
import { Ride } from 'src/schema/ride.schema';
import { User } from 'src/schema/user.schema';

export class RideCreateService {
    constructor(private readonly rideModel: Model<Ride>) { }

    createNewRide = asyncErrorWrapper(async (body: any, user: User): Promise<Ride> => {
        let rides = await this.rideModel.find({ createdBy: user.id, active: true }).exec();
        if (rides.length > 0) throw new BadRequestException('user has already 1 active ride, complete or cancel to create new');

        const { to, from, date, time, maxCapacity, city, description } = body;

        if (!to || !from || !date || !time || !maxCapacity || !city) {
            throw new BadRequestException('Some values are missing');
        }

        if (typeof maxCapacity !== 'number' || maxCapacity < 1 || maxCapacity > 7) {
            throw new BadRequestException('Invalid maxCapacity. Must be between 1 and 7.');
        }

        const newRide = new this.rideModel({
            to,
            from,
            date,
            time,
            maxCapacity,
            city,
            description,
            active: true,
            createdBy: user.id,
            postedBy: user.firstName,
            creatorImg: user.avatar,
            contact: user.mobile,
        });

        return await newRide.save();
    });
}
