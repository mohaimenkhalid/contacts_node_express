const express = require('express')
const morgan = require('morgan')
const contactRouter = require('./route');
const app = express();

app.set('view engine', 'ejs') //change view Engine

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/about', (req, res) => {
    res.render('pages/about')
})
app.get('/', (req, res) =>{
    let post = {
        title: 'Test title',
        body: 'Test body',
        published : true
    }
    res.render('pages/index', {title: 'EJS is a template Engine', post : post})
});
app.use('/contact', contactRouter);
app.get('*', (req, res) => {
    res.send('404 Not Found!');
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})