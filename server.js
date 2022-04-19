const  express= require('express')
const bodyparser= require('body-parser')
const https=require('https')
const {response} = require("express");
const app=express()
const port=3000

app.use(express.static('/'))
app.use('/css',express.static(__dirname+'/css'))
app.use('/img',express.static(__dirname+'/img'))
app.use('/fonts',express.static(__dirname+'/fonts'))
app.use('/js',express.static(__dirname+'/js'))

app.use('/cart', require('./routes/cart'))
app.use('/index', require('./routes/index'))
app.use('/checkout', require('./routes/checkout'))
app.use('/shop', require('./routes/shop'))
app.use('/product-details', require('./routes/product-details'))
app.use('/weather', require('./routes/weather'))
app.use(bodyparser.urlencoded({extended:true}))




app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/',((req, res) => {
    let cityname = req.body.city
    let key = "40eddc213bed23a5483ebd89f20c03e7"
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + key + "&units=metric&mode=json"
    https.get(url, function (response) {
        response.on('data', data => {
            // console.log(data)
            let a = JSON.parse(data)
            let temp = a.main.temp
            let cond = a.weather[0].description
            res.send("Weather in city:" + cityname + "  " + cond + "  " + temp)
        })

    })
}))

//start
    app.listen(port, () => {
        console.log("Example app listening on port ${port}")
    })