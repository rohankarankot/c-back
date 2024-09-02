import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import axios from 'axios';

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
            let transformedData = {
                country: "",
                state: "",
                city: "",
                pincode: "",
                latitude: null,
                longitude: null,
            };

            // Extract latitude and longitude from the geometry.location field
            const location = response.data.results[0].geometry.location;
            transformedData.latitude = location.lat;
            transformedData.longitude = location.lng;

            // Loop through address_components to extract the relevant data
            response.data.results[0].address_components.forEach(component => {
                if (component.types.includes("country")) {
                    transformedData.country = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                    transformedData.state = component.long_name;
                }
                if (component.types.includes("locality")) {
                    transformedData.city = component.long_name;
                }
                if (component.types.includes("postal_code")) {
                    transformedData.pincode = component.long_name;
                }
            });

            return transformedData;
        } catch (error) {
            console.error('Error fetching location details:', error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
