'use strict';

/**
 * This is a Node.JS application to fetch a ESNBC Account from network
 * Defaults:
 * batchesInfo :
 * productId: 
 * 
 */

const helper = require('./contractHelper');

async function main(batchesInfo,productId) {

	try {
		const fabricnetContract = await helper.getContractInstance();

		// Get ESNBC account
		console.log('.....Get ESNBC Account');
		const fabricBuffer = await fabricnetContract.submitTransaction('getESNBC', batchesInfo,productId);

		// process response
		console.log('.....Processing Get ESNBC Transaction Response\n\n');
		let existingESNBC = JSON.parse(fabricBuffer.toString());
		console.log(existingESNBC);
		console.log('\n\n.....Get ESNBC Transaction Complete!');
    return existingESNBC;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
    throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

// This function call is for testing purpose
//  main('1234','Ballu fabric').then(() => {
// 	console.log('.....API Execution Complete!');
// });

module.exports.execute = main;