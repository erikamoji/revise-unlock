// LockManagerABI.ts
export const LockManagerABI = [
    {
        "_format": "hh-sol-artifact-1",
        "contractName": "ILockManager",
        "sourceName": "contracts/interfaces/ILockManager.sol",
        "abi": [
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "fnftId",
                "type": "uint256"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "addressLock",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "timeLockExpiry",
                    "type": "uint256"
                  },
                  {
                    "internalType": "enum IRevest.LockType",
                    "name": "lockType",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "internalType": "address",
                        "name": "asset",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "compareTo",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "oracle",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "unlockValue",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bool",
                        "name": "unlockRisingEdge",
                        "type": "bool"
                      }
                    ],
                    "internalType": "struct IRevest.ValueLock",
                    "name": "valueLock",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct IRevest.LockParam",
                "name": "lock",
                "type": "tuple"
              }
            ],
            "name": "createLock",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "fnftId",
                "type": "uint256"
              }
            ],
            "name": "fnftIdToLock",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "addressLock",
                    "type": "address"
                  },
                  {
                    "internalType": "enum IRevest.LockType",
                    "name": "lockType",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "internalType": "address",
                        "name": "asset",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "compareTo",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "oracle",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "unlockValue",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bool",
                        "name": "unlockRisingEdge",
                        "type": "bool"
                      }
                    ],
                    "internalType": "struct IRevest.ValueLock",
                    "name": "valueLock",
                    "type": "tuple"
                  },
                  {
                    "internalType": "uint256",
                    "name": "timeLockExpiry",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "creationTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "unlocked",
                    "type": "bool"
                  }
                ],
                "internalType": "struct IRevest.Lock",
                "name": "",
                "type": "tuple"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "fnftId",
                "type": "uint256"
              }
            ],
            "name": "fnftIdToLockId",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "lockId",
                "type": "uint256"
              }
            ],
            "name": "getLock",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "addressLock",
                    "type": "address"
                  },
                  {
                    "internalType": "enum IRevest.LockType",
                    "name": "lockType",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "internalType": "address",
                        "name": "asset",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "compareTo",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "oracle",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "unlockValue",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bool",
                        "name": "unlockRisingEdge",
                        "type": "bool"
                      }
                    ],
                    "internalType": "struct IRevest.ValueLock",
                    "name": "valueLock",
                    "type": "tuple"
                  },
                  {
                    "internalType": "uint256",
                    "name": "timeLockExpiry",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "creationTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "unlocked",
                    "type": "bool"
                  }
                ],
                "internalType": "struct IRevest.Lock",
                "name": "",
                "type": "tuple"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "fnftId",
                "type": "uint256"
              }
            ],
            "name": "getLockMaturity",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "lockTypes",
            "outputs": [
              {
                "internalType": "enum IRevest.LockType",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "fnftId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "lockId",
                "type": "uint256"
              }
            ],
            "name": "pointFNFTToLock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "fnftId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              }
            ],
            "name": "unlockFNFT",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        "bytecode": "0x",
        "deployedBytecode": "0x",
        "linkReferences": {},
        "deployedLinkReferences": {}
      }
  ];
  