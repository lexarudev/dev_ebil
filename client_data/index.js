'use strict';

const {Contract} = require('fabric-contract-api');

class FabricContract extends Contract {

	constructor() {
		// Provide a custom name to refer to this smart contract
		super('org.fabric-network.fabricnet');
	}

	// This function will be called at the time of initialising the chaincode to make sure that chaincode is successfully initialised
	async instantiate(ctx){
		console.log("Fabric Network initialised succesfully");
	}

	/**
	 * Create a new ESNBC account on the network
	 * @param ctx - The transaction context object
	 * @param batchesInfo - ID to be used for creating new ESNBC
	 * @param productId - ID to be used for creating new ESNBC
	 * @param productName - Name of the product
	 * @param certification - Name of the certification
	 * @param supplier - Name of the supplier
	 * @param origin - Country of origin of product
	 * @param price - Price of product
	 * @returns
	 */
	async createESNBC(ctx,batchesInfo,productId,productName,certification,supplier,origin,price){
		// Create a new composite key for the new ESNBC 
		const ESNBCkey = ctx.stub.createCompositeKey('org.fabric-network.fabricnet.ESNBC',[batchesInfo,productId]);

		let newESNBCObject = {
			batchesInfo: batchesInfo,
			productId: productId,
			productName: productName,
			certification: certification,
			supplier: supplier,
			origin: origin,
			price: price,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Convert the JSON object to a buffer and send it to blockchain for storage
		let dataBuffer = Buffer.from(JSON.stringify(newESNBCObject));
		await ctx.stub.putState(ESNBCkey, dataBuffer);
		// Return value of new ESNBC account created to user
		return newESNBCObject;

	}

	/**
	 * Get an ESNBC account's details from the blockchain
	 * @param ctx - The transaction context
	 * @param batchesInfo - ID to be used for creating new ESNBC
	 * @param productId - ID to be used for creating new ESNBC
	 * @returns
	 */
	async getESNBC(ctx,batchesInfo,productId) {
		// Create the composite key required to fetch record from blockchain
		const ESNBCkey = ctx.stub.createCompositeKey('org.fabric-network.fabricnet.ESNBC',[batchesInfo,productId]);

		// Return value of ESNBC account from blockchain
		let ESNBCBuffer = await ctx.stub
				.getState(ESNBCkey)
				.catch(err => console.log(err));
		return JSON.parse(ESNBCBuffer.toString());
	}
}

module.exports = FabricContract;
