//master route file
const noteroutes=require('./notes_routes.js');
module.exports=function (app,db){
    noteroutes(app,db)
}