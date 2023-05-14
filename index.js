const express = require('express') ;
const ejs = require('ejs') ;
const qrcode = require('qrcode')
const path = require('path') ;
const port = process.env.port || 3000 ;
const app = express() ;

//######## MIDDLEWARE ###########
app.use(express.json()) ;
app.use(express.urlencoded({extended:false})) ; //help to grap the request from body

//######## Static File [css] SETTING ###########
app.use(express.static('public'));

//######## VIEW ENGINE EJS SETTING ###########
app.set('view engine' , 'ejs') ;
app.set('views' , path.join(__dirname, 'view')) ;

//######## ROUTES ###########
app.get('/' , (req , res , next) => {
    res.render("index")
})

app.post('/scan' , (req , res , next) => {
    const input_text = req.body.textdata ;
    console.log(input_text);
    qrcode.toDataURL(input_text , (err, src) => {
        res.render('qrscan' , {
            qr_code: src ,
        })
    })
})


app.listen(port , console.log(`Listing on Port ${port}`)) 