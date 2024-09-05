import { Module } from '@nestjs/common';
import { RideService } from './ride.service';

@Module({
  providers: [RideService]
})
export class RideModule {}
