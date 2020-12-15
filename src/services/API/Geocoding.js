const axios = require("axios");

// const api = axios.create({
//   baseURL:`https://maps.googleapis.com/maps/api/geocode/json?address=`
// });

module.exports = {
  async geocode(search){
    try{
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoiZGF2aWFyY2UiLCJhIjoiY2tiYTJpM2hxMDFzbTJua296ZXRkY2RldyJ9.mADUnnPkI-I06-xav8cabQ`);
      return response.data;
    }
    catch(err){
      return err;
    }
  }
};