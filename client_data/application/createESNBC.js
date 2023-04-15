'use strict';

/**
 * This is a Node.JS application to register a new ESNBC on the network.
 */

const helper = require('./contractHelper');

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;

async function main(batchesInfo,productId,productName,certification,supplier,origin,price) {

	try {

		const fabricnetContract = await helper.getContractInstance();

		// Create a new ESNBC account
		console.log('.....Create a new ESNBC account');
		const ESNBCBuffer = await fabricnetContract.submitTransaction('createESNBC', batchesInfo,productId,productName,certification,supplier,origin,price);

		// process response
		console.log('.....Processing Create ESNBC Transaction Response \n\n');
		let newESNBC = JSON.parse(ESNBCBuffer.toString());
		console.log(newESNBC);
		console.log('\n\n.....Create ESNBC Transaction Complete!');
		return newESNBC;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

// This function call is for testing purpose
//  main('12345','Ballu fabric','Ghaziabad','Manufacturer','fa','fafaf','dwdw').then(() => {
// 	console.log('fabric account created');
// });

module.exports.execute = main;
