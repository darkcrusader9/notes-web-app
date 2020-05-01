//object id type
var ObjectID = require('mongodb').ObjectID

module.exports=function(app,db){
    //this is to post a new note
    app.post('/notes', (req, res) => {
		var note = { 
            "author" : req.body.author, 
            "title"   : req.body.title,  
            "body"  : req.body.body
        };
		db.collection('notes').insert(note, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result.ops[0]);
			}
		});
    });
    //this is to get note by id
    app.get('/notes/:id',(req,res)=>{
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result);
			}
		});
    })
    //get note by username
    app.get('/notes/user/:name',(req,res)=>{
        const name = req.params.name;
        const details = {'author': name };
        db.collection('notes').find(details).toArray(function(err, result){
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result);
			}
		});
    })



    //delete a given note by id
    app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('notes').remove(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send('Note ' + id + ' deleted!');
			}
		});
	});
    

    //update a note by id
	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		const note = { 
        "author" : req.body.author, 
        "title"   : req.body.title,  
        "body"  : req.body.body 
        };
		db.collection('notes').update(details, note, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});

}