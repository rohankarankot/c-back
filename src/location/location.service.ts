import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import axios from 'axios';
import { transformAutocompleteResults, transformLocationDetails } from 'src/helpers/location.transformer';

@Injectable()
export class LocationService {

    async getLocationDetailsByPin(@Query() req): Promise<any> {
        const { lat, long } = req;

        if (!lat || !long) {

            throw new HttpException("Missing lat and long", HttpStatus.BAD_REQUEST);
        }
        const url = `${process.env.OLA_MAPS_URI}/places/v1/reverse-geocode?latlng=${lat}%2C${long}&api_key=${process.env.OLA_API_KEY}`;

        try {
            const response = await axios.get(url);
            const transformedData = transformLocationDetails(response.data)
            return transformedData;
        } catch (error) {
            console.error('Error fetching location details:', error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async getlocationAutoComplete(@Query() query): Promise<any> {
        const { lat, long, input } = query;

        // Basic validation
        if (!lat || !long || !input) {
            throw new HttpException('Missing required parameters', HttpStatus.BAD_REQUEST);
        }

        // Construct the URL with encoded input
        const url = `${process.env.OLA_MAPS_URI}/places/v1/autocomplete?input=${encodeURIComponent(input)}&location=${lat}%2C${long}&api_key=${process.env.OLA_API_KEY}`;

        try {
            // Fetch data from the API
            const response = await axios.get(url);
            const transformedData = transformAutocompleteResults(response.data);
            return transformedData;
        } catch (error) {
            console.error('Error fetching places details:', error.message || error);
            throw new HttpException('Error fetching places details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
