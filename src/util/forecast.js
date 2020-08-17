const request = require('request');

const forecast = (latitude,longitude,callback) =>{
    const access_token//Initialize your access token here
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+access_token

    request({url : url, json:true},(err,res)=>{
        if(err){
            callback('Unable to ocnnect to internet',undefined);
        }
        else if(res.body.message){
            callback(res.body.message,undefined);
        }
        else{
            callback(undefined,{
                temp : (res.body.main.temp-273.5).toFixed(1),
                desc : res.body.weather[0].description
            });
        }
    });
}

module.exports=forecast