import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    @Get("pincode")
    getlocationDetailsByPin(
        @Query() req
    ) {
        return this.locationService.getLocationDetailsByPin(req);
    }
    @Get("autocomplete")
    getlocationAutocomplete(
        @Query() req
    ) {
        return this.locationService.getlocationAutoComplete(req);
    }
}
