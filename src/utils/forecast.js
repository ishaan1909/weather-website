const request = require("request")

const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+longitude+"&units=metric&appid=6facab51493c7c70254afb039acaff7d"
    request({url:url,json:true} , (error,{body})=>{
        if(error){
            callback("Unable to connect to the services",undefined);
        }
        else{
            callback(undefined,{
                temperature:body.main.temp,
                desc:body.weather[0].description,
                iconId :body.weather[0].icon
            })
        }
    })
}

module.exports = forecast;