const Request = require('request-promise')

const DarkSkyReq = async (longitude ,latitude) => {

    const url = 'https://api.darksky.net/forecast/03db7eeb912980f7c4a3f8a81dcabf32/' + latitude + ',' + longitude + '?units=uk2'

    try {
        const result = await Request({url, json: true});

        return {
            Summary: result.daily.data[0].summary,
            PrecipChance: result.currently.precipProbability,
            Temp: result.currently.temperature
        }

    } catch(e) {
        throw new Error(e.message);
    }
}

module.exports = DarkSkyReq