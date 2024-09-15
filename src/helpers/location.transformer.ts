export function transformLocationDetails(data: any): any {
    let transformedData = {
        country: "",
        state: "",
        city: "",
        pincode: "",
        sublocality: "",
        latitude: null,
        longitude: null,
    };

    let sublocalityCount = {};

    // Loop through all the results
    data.results.forEach(result => {
        // Extract latitude and longitude from the geometry.location field
        const location = result.geometry.location;
        if (!transformedData.latitude || !transformedData.longitude) {
            transformedData.latitude = location.lat;
            transformedData.longitude = location.lng;
        }

        // Loop through address_components to extract the relevant data
        result.address_components.forEach(component => {
            if (component.types.includes("country")) {
                transformedData.country = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
                transformedData.state = component.long_name;
            }
            if (component.types.includes("locality")) {
                transformedData.city = component.long_name;
            }
            if (component.types.includes("sublocality")) {
                // Count occurrences of each sublocality
                const sublocality = component.long_name;
                if (!sublocalityCount[sublocality]) {
                    sublocalityCount[sublocality] = 0;
                }
                sublocalityCount[sublocality]++;
            }
            if (component.types.includes("postal_code")) {
                transformedData.pincode = component.long_name;
            }
        });
    });

    // Find the most frequent sublocality
    let maxCount = 0;
    let mostFrequentSublocality = "";
    for (let sublocality in sublocalityCount) {
        if (sublocalityCount[sublocality] > maxCount) {
            maxCount = sublocalityCount[sublocality];
            mostFrequentSublocality = sublocality;
        }
    }

    // Set the most frequent sublocality
    transformedData.sublocality = mostFrequentSublocality;

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
