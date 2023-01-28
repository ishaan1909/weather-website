const request = require("request");
const geocode = (address,callback) =>{
    const url = "http://api.openweathermap.org/geo/1.0/direct?q="+encodeURIComponent(address)+"&limit=5&appid=6facab51493c7c70254afb039acaff7d";
    request({url:url , json:true} , (error,{body})=>{
        if(error){
            callback("Unable to connect to location services",undefined);
        }
        else
        {
            callback(undefined,
                {
                    latitude:body[0].lat,
                    longitude:body[0].lon,
                    location:body[0].name
                })
        }
    })
}

module.exports = geocode;