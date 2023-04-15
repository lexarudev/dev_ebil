const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

// Import all function modules
const addToWallet = require('./addCredToWallet');
const createESNBC = require('./createESNBC');
const getESNBC = require('./getESNBC');

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Fabric App');

app.get('/', (req, res) => res.send('Welcome to Fabric Network'));

app.post('/addToWallet', (req, res) => {
	addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath)
			.then(() => {
				console.log('User credentials added to wallet');
				const result = {
					status: 'success',
					message: 'User credentials added to wallet'
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
		});

app.post('/createESNBC', (req, res) => {
	createESNBC.execute(req.body.batchesInfo, req.body.productId, req.body.productName, req.body.certification, req.body.supplier, req.body.origin, req.body.price)
			.then((esnbc) => {
				console.log('New ESNBC account created');
				const result = {
					status: 'success',
					message: 'New ESNBC account created',
					ESNBC_Details: esnbc
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.get('/getESNBC', (req, res) => {
	getESNBC.execute(req.body.batchesInfo, req.body.productId)
			.then((esnbc) => {
				console.log('Reterived ESNBC ');
				const result = {
					status: 'success',
					message: 'Reterived ESNBC ',
					ESNBC_Details: esnbc
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


app.listen(port, () => console.log(`Distributed Certification App listening on port ${port}!`));
