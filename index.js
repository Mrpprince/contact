const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router=require('./route');

const app = express();
app.set('view engine','ejs')
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/contacts',router)

// let schema = mongoose.Schema;
// let testSchema = new schema({
//     name: String
// })

// let Test = mongoose.model('Test', testSchema)
app.get('/', (req, res) => {
    // let test = new Test({
    //     name: 'prince'
    // })
    // test.save()
    // .then(t=>{
    //     res.json(t);
    // })
    // .catch(e=>{
    //     res.status(500).json({
    //         error:'error occurred'
    //     })
    // })
})

mongoose.connect(`mongodb+srv://testname:testpass@cluster0.ynnkd.mongodb.net/testdb?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        app.listen(5050, () => {
            console.log(' running success')
        })
    })
    .catch((e) => {
        console.log(e);
    })