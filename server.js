const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const url='mongodb://localhost:27017/databases';

app.use(bodyParser.urlencoded({extended:true}));
//connecting to mongodb database
mongoose.connect(url,{
useNewUrlParser : true,
useUnifiedTopology : true
},  (err,db)=>{
    if(err)
        return console.log(err);
    require('./routes')(app,db);
    app.listen(3000,()=>{
        console.log('server started.....');
    });
});

