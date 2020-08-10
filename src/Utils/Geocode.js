const Request = require('request-promise')

const GeoCode = async (Address)=> {

    const URLAddress = encodeURIComponent(Address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + URLAddress + '.json?access_token=pk.eyJ1IjoibHV0ZXJhbiIsImEiOiJjazg3MDRnczAwYWk2M2VwcnM4a2c5a3ZwIn0.tbai7u-BD-uDWYCBnxlkbQ'
    
    try {
        const result = await Request({url, json: true});

        if (result.features.length > 0) {
            return {
                latitude: result.features[0].center[1],
                longitude: result.features[0].center[0],
                location: result.features[0].place_name
            }
        }

    } catch(e) {
        throw new Error("Error: Unable to connect to Coordinate navigator");
    }
    throw new Error('Please Enter A Valid Location');
}

module.exports = GeoCode