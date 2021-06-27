const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "secret_key";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +",ind&APPID="+ apiKey +"&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);

            const temp = weatherdata.main.temp;
            const desc = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            console.log(temp);
            console.log(desc);
            console.log(icon);
            res.write("<h1>The temperature in "+ query +" is "+ temp +" °C</h1>");
            res.write("<p>with "+desc+"</p>");
            res.write("<img src="+ iconUrl +">")
            res.send();
        })
    });
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000.");
})