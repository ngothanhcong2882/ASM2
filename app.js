var express = require ('express');
var app = express();

const {ObjectId,MongoClient, Int32} = require('mongodb')
var publicDir = require('path').join(__dirname,'/public');
var url = "mongodb+srv://cong:cong2882@cluster0.fxl1m.mongodb.net/test";

var hbs = require('hbs')
app.set('view engine','hbs')

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extented: false}))

var PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("server is running at "+ PORT)

app.get('/', async(req, res)=>{
    let client= await MongoClient.connect(url);
        let dbo = client.db("CSSTORE");
        let results = await dbo.collection("Product").find({}).toArray();
        res.render('home', {model: results});
})




app.get('/myhome', async(req, res)=>{
    let client= await MongoClient.connect(url);
        let dbo = client.db("CSSTORE");
        let results = await dbo.collection("Product").find({}).toArray();
        res.render('home', {model: results});
})

app.post('/addProduct', async(req, res)=>{
    let client = await MongoClient.connect(url);
    let dbo = client.db("CSSTORE");
    let name = req.body.Name;
    let madein = req.body.Madein;
    let picture = req.body.Picture; 
    let price = req.body.Price;
    
    
    let newProduct = {Name: name,Madein: madein, Price: price,Picture: picture };
    await dbo.collection('Product').insertOne(newProduct);
    res.redirect('/myhome');
})

app.get("/delete", async(req, res)=>{
    const idInput = req.query.id;

    
    const client = await MongoClient.connect(url);
    const dbo = client.db("CSSTORE");
    await dbo.collection("Product").deleteOne({_id:ObjectId(idInput)})
    res.redirect('/');
})


app.post('/search', async(req, res)=>{
    let searchText = req.body.txtSearch;
    let client = await MongoClient.connect(url)
    let dbo = client.db("CSSTORE");
    let results = await dbo.collection("Product").find({Name: new RegExp(searchText, 'i')}).toArray();
    res.render('home',{model: results} )
})


app.get('/addProduct', (req,res)=>{
    res.render('addProduct')
})
app.get('/contact', (req,res)=>{
    res.render('contact')
})
app.get('/', (req, res)=>{
    res.render('home');
})
