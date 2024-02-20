const abi = require("./abi.json");
const { Web3 } = require("web3");
const zkatanaProvider = "https://rpc.startale.com/zkatana";
const nftContractAddress = "0xc4b00D0D39f2ed308f928b5006Ea68c215C53F46";
var web3 = new Web3(new Web3.providers.HttpProvider(zkatanaProvider));
const contract = new web3.eth.Contract(abi, nftContractAddress);

async function getOwner(id: number): Promise<string> {
	const owner = await contract.methods.ownerOf(id).call();
	return owner;
}

const max_id = 5;
let id_map: Map<number, string> = new Map<number, string>();

async function getOwnerList() {
	for (let i: number = 0; i < max_id; i++) {
		try {
			let ownerObject = await getOwner(i);
			id_map.set(i, ownerObject);
		} catch {
			id_map.set(i, "no owner");
		}
	}
	console.log(id_map);
}

getOwnerList();
