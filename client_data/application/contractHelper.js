const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;


async function getContractInstance() {

	// A gateway defines which peer is used to access Fabric network
	// It uses a common connection profile (CCP) to connect to a Fabric Peer
	// A CCP is defined manually in file connection-profile-manufacturer.yaml
	gateway = new Gateway();

	// A wallet is where the credentials to be used for this transaction exist
	// Credentials for user MANUFACTURER_ADMIN was initially added to this wallet.
	const wallet = new FileSystemWallet('./identity/manufacturer');

	// What is the username of this Client user accessing the network?
	const fabricUserName = 'MANUFACTURER_ADMIN';

	// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
	let connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile-manufacturer.yaml', 'utf8'));

	// Set connection options; identity and wallet
	let connectionOptions = {
		wallet: wallet,
		identity: fabricUserName,
		discovery: { enabled: false, asLocalhost: true }
	};

	// Connect to gateway using specified parameters
	console.log('.....Connecting to Fabric Gateway');
	await gateway.connect(connectionProfile, connectionOptions);

	// Access fabric channel
	console.log('.....Connecting to channel - pharmachannel');
	const channel = await gateway.getNetwork('pharmachannel');

	// Get instance of deployed fabricNet contract
	// @param Name of chaincode
	// @param Name of smart contract
	console.log('.....Connecting to fabricnet Smart Contract');
	return channel.getContract('fabricnet', 'org.fabric-network.fabricnet');
}

function disconnect() {
	console.log('.....Disconnecting from Fabric Gateway');
	gateway.disconnect();
}

module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;