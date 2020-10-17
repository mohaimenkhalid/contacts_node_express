const express = require('express')
const morgan = require('morgan')
const contactRouter = require('./route');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs') //change view Engine
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) =>{
    res.json({
    })
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
