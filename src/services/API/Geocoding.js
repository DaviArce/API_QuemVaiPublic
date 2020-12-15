const axios = require("axios");

// const api = axios.create({
//   baseURL:`https://maps.googleapis.com/maps/api/geocode/json?address=`
// });

module.exports = {
  async geocode(search){
    try{
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=`);
      return response.data;
    }
    catch(err){
      return err;
    }
  }
};
