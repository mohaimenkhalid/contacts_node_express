const express = require('express')
const morgan = require('morgan')
const contactRouter = require('./route');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs') //change view Engine

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const { Schema } = mongoose;
let testSchema = new Schema({
    name : String
});

let Test = mongoose.model('Test', testSchema)

app.get('/about', (req, res) => {
    res.render('pages/about')
})
app.get('/', (req, res) =>{
    let test = new Test({
        name : 'Mohaimen Khalid'
    })
    test.save()
        .then(t => {
            res.json(t)
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({
                'error' : `Error Occurred`
            })
        })
    /*let post = {
        title: 'Test title',
        body: 'Test body',
        published : true
    }
    res.render('pages/index', {title: 'EJS is a template Engine', post : post})*/
});
app.use('/contact', contactRouter);
app.get('*', (req, res) => {
    res.send('404 Not Found!');
})


const PORT = process.env.PORT || 5000
const  mongoAtlasUri = "mongodb+srv://root:root@cluster0.zdrps.mongodb.net/express?retryWrites=true&w=majority";
mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        })
    })
    .catch(e =>{
        console.log(e);
    })
