'use strict';

/**
 * This is a Node.JS module to create ESNBC.
 * Defaults:
 *  User Name: MANUFACTURER_ADMIN
 *  User Organization: Manufacturer
 *  User Role: Admin
 *
 */

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../network/crypto-config'); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const wallet = new FileSystemWallet('./identity/manufacturer');

async function main(certificatePath, privateKeyPath) {

	// Main try/catch block
	try {

		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		// IMPORTANT: Change the private key name to the key generated on your computer
		const privatekey = fs.readFileSync(privateKeyPath).toString();

		// Load credentials into wallet
		const identityLabel = 'MANUFACTURER_ADMIN';
		const identity = X509WalletMixin.createIdentity('manufacturerMSP', certificate, privatekey);

		await wallet.import(identityLabel, identity);

	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

// This function call is for testing purpose
  //  main('/Users/shashankawasthi/Downloads/certification-network/network/crypto-config/peerOrganizations/mhrd.certification-network.com/users/Admin@mhrd.certification-network.com/msp/signcerts/Admin@mhrd.certification-network.com-cert.pem', '/Users/shashankawasthi/Downloads/certification-network/network/crypto-config/peerOrganizations/mhrd.certification-network.com/users/Admin@mhrd.certification-network.com/msp/keystore/ea3cf6075082eb80e3a522e5e1d3151d0b8a91ba1fc239c0b6c4fec22a634160_sk').then(() => {
  // console.log('User identity added to wallet.');
// });

module.exports.execute = main;
