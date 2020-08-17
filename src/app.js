const path = require('path')
const express = require('express')
const hbs  = require('hbs')
const geocode = require('./util/geocode')
const forecast= require('./util/forecast')



/* console.log(__dirname);
console.log(path.join(__dirname,'../public')) */

const app = express()
const port = process.env.PORT || 3000


//defines path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Ashish',
        location:'Kolkata'
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'HELP',
        name : 'Ashish Dwivedi',
        helptext : 'For any Kind of help please contact admin'

    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'ABOUT US',
        name : 'Ashish Dwivedi'
    })
});

/* app.get('/about',(req,res)=>{
    res.send('About Page ')
});
 */
app.get('/weather',(req,res)=>{
    //console.log(req.query.address);

    if(!req.query.address){
        return res.send({
            error:'error address must be provided'
        });
    }


    geocode(req.query.address,(err,data)=>{
        if(err){
            return res.send({
                error : err
            })
        }
        console.log(data);
        forecast(data.latitude,data.longitude,(err,forecastData)=>{
            if(err){
                return res.send({
                    error:err
                })
            }

            res.send({
                forecast : forecastData,
                location : data.location,
                address : req.query.address
            })
        });
    })


    /* res.send({
        forecast : 'Its rainy',
        location : 'India',
        address : req.query.address
    }) */
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Ashish',
        errorMessage : 'Help article Not Found'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Ashish',
        errorMessage : 'Page Not Found'
    });
});



app.listen(port, ()=>{
    console.log('Server up and running on port '+port);
});