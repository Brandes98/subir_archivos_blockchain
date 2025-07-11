const CONTRACT_ADDRESS = "0xb2027585f6f5d9f092ef93785a79b53f20fbb6e5";
const TOKEN_ADDRESS =  "0x1c1728c410d2dff3c52c708f3560accecf0b228f";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "uploader",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cid",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "filename",
				"type": "string"
			}
		],
		"name": "FileUploaded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newCost",
				"type": "uint256"
			}
		],
		"name": "setUploadCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_cid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_filename",
				"type": "string"
			}
		],
		"name": "uploadFile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "files",
		"outputs": [
			{
				"internalType": "string",
				"name": "cid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "filename",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "uploader",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "cid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "filename",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "uploader",
						"type": "address"
					}
				],
				"internalType": "struct UploadDownload.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "udtToken",
		"outputs": [
			{
				"internalType": "contract ERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uploadCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const projectId = "03dca5b735c94e86b3939e4b47abdc31"; // tu Project ID
const projectSecret = "pUsGeZzSU6CNBPa5ah8K0QIMNYy2Ys6xL5yuXmMmaGqrQSlu0EfkMw"; // tu API Key Secret (usá el valor completo)
const auth = "Basic " + btoa(projectId + ":" + projectSecret);

const ipfs = window.IpfsHttpClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});


async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return alert("Selecciona un archivo");

  // Usar Pinata con JWT
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMjEyZmM3NS01NWIzLTQxNDQtYTkwMS0xZWNhNjZiOGI4NGMiLCJlbWFpbCI6ImJyYW5kb25hY3ViZXJvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4MzNiMmQyYzUwZWU0YmYwNGJhYyIsInNjb3BlZEtleVNlY3JldCI6ImJjMWExODkzMGRkZGIwZjRhOWYzNTZmNDUxZGFlMjk1ZDcxMThiMTM1MTFkMjg5NWRjYWY2NTVmOGM3NTQwZTUiLCJleHAiOjE3ODM4MTExNTh9.0ffFfZfCSBX-vsg5voSLIb__ik2gdL_2zIB60Fa-rj4" // ⬅️ REEMPLAZA esto por tu JWT de Pinata
    },
    body: formData
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al subir a IPFS via Pinata: " + errorText);
  }

  const data = await res.json();
  const cid = data.IpfsHash;
  const filename = file.name;

  // Conectarse a Metamask
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  // Aprobar token
  const token = new ethers.Contract(TOKEN_ADDRESS, [
    "function approve(address spender, uint256 amount) public returns (bool)"
  ], signer);

  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const cost = ethers.parseUnits("10", 18);
  await token.approve(CONTRACT_ADDRESS, cost);

  // Guardar en blockchain
  const tx = await contract.uploadFile(cid, filename);
  await tx.wait();

  alert("Archivo subido exitosamente");
  await loadFiles();
}


async function loadFiles() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const files = await contract.getFiles();
  const list = document.getElementById("fileList");
  list.innerHTML = "";

  files.forEach(file => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="https://ipfs.io/ipfs/${file.cid}" target="_blank">${file.filename}</a> (by ${file.uploader})`;
    list.appendChild(li);
  });
}

window.onload = loadFiles;
