const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const connectToDatabase = async () => {
	const connection = new MongoClient('mongodb://mongo:27017/docker');

	return await connection.connect();
};

const app = express();

app.use(express.json());

const port = 3000;

app.get('/', async (req, res) => {
	const database = (await connectToDatabase()).db('docker');

	const names = database.collection('names');

	const result = names.find();

	console.log('[GET RESULT] ', result);

	res.status(200).json(result);
});

app.post('/', async (req, res) => {
	const database = (await connectToDatabase()).db('docker');

	const names = database.collection('names');

	const result = await names.insertOne({ name: req.body.name });

	console.log('[POST RESULT] ', result);


	res.status(201).json(result);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
