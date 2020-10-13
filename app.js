const express = require('express')
const morgan = require('morgan')
const contactRouter = require('./route');
const app = express();
app.use(morgan('dev'))

app.use('/contact', contactRouter);
app.get('*', (req, res) => {
    res.send('404 Not Found!');
})






const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})