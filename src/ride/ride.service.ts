import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from 'src/schema/ride.schema';
import { User } from 'src/schema/user.schema';


@Injectable()
export class RideService {
    constructor(
        @InjectModel(Ride.name) private readonly rideModel: Model<Ride>,
    ) { }

    async createNewRide(body: any, user: User): Promise<Ride> {
        
        const { to, from, date, time, maxCapacity, city, description } = body;

        if (!to || !from || !date || !time || !maxCapacity || !city) {
            throw new BadRequestException('Some values are missing');
        }

        // Validate the data
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
            createdBy: user.id,
            postedBy: user.firstName,
            creatorImg: user.avatar,
            contact: user.mobile
        });

        try {
            return await newRide.save();
        } catch (error) {
            console.error('Error creating new ride:', error);
            throw new BadRequestException('Error creating new ride');
        }
    }


    async getride(@Query() query): Promise<any> {
        const { city } = query;
        if (!city) {
            throw new BadRequestException('provide city');
        }
        // Create a case-insensitive regular expression
        const cityRegex = new RegExp(city, 'i');

        const rides = await this.rideModel.find({ city: cityRegex }).exec();
        if (!rides.length) {
            throw new NotFoundException('No rides found for the specified city');
        }

        return rides;
    }
}