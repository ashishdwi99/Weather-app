const request = require('request');
const access_token='pk.eyJ1IjoiYXNoaXNoZHdpOTkiLCJhIjoiY2tkajV1cGQ1MGJvaTJ5bGN2b2tlbjZ1aiJ9.h_c2h1Hp4An1N8gYjFHxSg'//Initialize your access token here
const geocode =(address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token='+access_token;

    request({url : url, json: true}, (err,res)=>{
        if(err){
            callback('Unable to connect to internet',undefined);
        }
        else if(res.body.features.length===0){
            callback('Unable to find location. Please enter valid search',undefined);
        }
        else{
            callback(undefined,{
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location : res.body.features[0].place_name 
            });
        }
    });
}

module.exports=geocode