const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

function getDbCollection (dbAddress, dbName, dbCollectionName){
    const client = new MongoClient(dbAddress);
    const db = client.db(dbName);
    return collection = db.collection(dbCollectionName);
}

app.get('/tasks', async function(req, res){
    const collection = await getDbCollection('mongodb://127.0.0.1', 'TVsets', 'models');
    const data = await collection.find({}).toArray();
    res.send(data);
});

app.get('/tasks/:id', async function(req, res){
    const collection = await getDbCollection('mongodb://127.0.0.1', 'TVsets', 'models');
    const data = await collection.findOne({_id: new ObjectId(req.params.id)});
    res.send(data);
});

app.post('/tasks', async function(req, res){
    const task = {...req.body, done: false};
    const collection = await getDbCollection('mongodb://127.0.0.1', 'TVsets', 'models');
    await collection.insertOne(task);
    res.send(task);
});

app.patch('/tasks/:id', async function(req, res){
    const collection = await getDbCollection('mongodb://127.0.0.1', 'TVsets', 'models');
    const data = await collection.updateOne({_id: new ObjectId(req.params.id)}, {'$set': req.body});
    res.send({});
});

app.delete('/tasks/:id', async function(req, res){
    const collection = await getDbCollection('mongodb://127.0.0.1', 'TVsets', 'models');
    const data = await collection.deleteOne({_id: new ObjectId(req.params.id)});
    res.send({});
});

app.listen(port, function() {
    console.log('server is started!');
});