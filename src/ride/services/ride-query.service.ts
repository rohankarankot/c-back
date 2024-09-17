import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { asyncErrorWrapper } from 'src/helpers/asyncErrorWrapper';
import { Ride } from 'src/schema/ride.schema';

export class RideQueryService {
    constructor(private readonly rideModel: Model<Ride>) { }

    getRides = asyncErrorWrapper(async (query) => {
        const { city } = query;
        if (!city) {
            throw new BadRequestException('provide city');
        }

        const cityRegex = new RegExp(city, 'i');
        const rides = await this.rideModel.find({ city: cityRegex, active: true }).exec();
        if (!rides.length) {
            throw new NotFoundException('No rides found for the specified city');
        }

        return rides;
    });
}
