export function transformLocationDetails(data: any): any {
    let transformedData = {
        country: "",
        state: "",
        city: "",
        pincode: "",
        latitude: null,
        longitude: null,
    };

    // Extract latitude and longitude from the geometry.location field
    const location = data.results[0].geometry.location;
    transformedData.latitude = location.lat;
    transformedData.longitude = location.lng;

    // Loop through address_components to extract the relevant data
    data.results[0].address_components.forEach(component => {
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
}

export function transformAutocompleteResults(data: any): any {
    return data.predictions.map(prediction => ({
        id: prediction.reference,
        name: prediction.structured_formatting.main_text,
        description: prediction.description,
        address: prediction.structured_formatting.secondary_text,
        coords: {
            latitude: prediction.geometry.location.lat,
            longitude: prediction.geometry.location.lng
        },
        distanceMeters: prediction.distance_meters
    }));
}
