import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { asyncErrorWrapper } from 'src/helpers/asyncErrorWrapper';
import { Ride, RideStatus } from 'src/schema/ride.schema';
import { User } from 'src/schema/user.schema';

export class RideCompleteService {
    constructor(private readonly rideModel: Model<Ride>) { }

    completeRide = asyncErrorWrapper(async (user: User, query) => {
        const { status, id } = query;

        // Make sure that the status is a valid value from the RideStatus enum
        if (!Object.values(RideStatus).includes(status)) {
            throw new BadRequestException('Invalid status value');
        }

        // Use findByIdAndUpdate with error handling
        let ride = await this.rideModel.findByIdAndUpdate(
            id, // First argument is the id
            { $set: { active: false, status } }, // Second argument is the update object
            { new: true } // Ensures the updated document is returned
        ).exec();

        // If no document was found with the given ID, throw an error
        if (!ride) {
            throw new NotFoundException('No ride found with the specified id');
        }

        return { message: "Ride updated successfully" };

    });
}
