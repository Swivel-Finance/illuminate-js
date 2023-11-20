export const MARKETPLACE_ABI = [
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'r',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'l',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'c',
                'type': 'address',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'constructor',
    },
    {
        'inputs': [
            {
                'internalType': 'uint8',
                'name': '',
                'type': 'uint8',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'name': 'Exception',
        'type': 'error',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'tokensBurned',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'underlyingReceived',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'principalTokensReceived',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'burner',
                'type': 'address',
            },
        ],
        'name': 'Burn',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address[]',
                'name': 'tokens',
                'type': 'address[]',
            },
        ],
        'name': 'CreateMarket',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'underlyingIn',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'principalTokensIn',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'minted',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'minter',
                'type': 'address',
            },
        ],
        'name': 'Mint',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'admin',
                'type': 'address',
            },
        ],
        'name': 'SetAdmin',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
        ],
        'name': 'SetPool',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'principal',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'adapter',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint8',
                'name': 'protocol',
                'type': 'uint8',
            },
        ],
        'name': 'SetPrincipal',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'underlying',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'maturity',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'sold',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'bought',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'received',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'spent',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'spender',
                'type': 'address',
            },
        ],
        'name': 'Swap',
        'type': 'event',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'name': '_markets',
        'outputs': [
            {
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'uint8',
                'name': '',
                'type': 'uint8',
            },
        ],
        'name': 'adapters',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'admin',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint8',
                'name': 'p',
                'type': 'uint8',
            },
            {
                'internalType': 'bytes',
                'name': 'a',
                'type': 'bytes',
            },
        ],
        'name': 'approve',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'bytes[]',
                'name': 'c',
                'type': 'bytes[]',
            },
        ],
        'name': 'batch',
        'outputs': [
            {
                'internalType': 'bytes[]',
                'name': 'results',
                'type': 'bytes[]',
            },
        ],
        'stateMutability': 'payable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio',
                'type': 'uint256',
            },
        ],
        'name': 'burn',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio',
                'type': 'uint256',
            },
        ],
        'name': 'burnForUnderlying',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint128',
                'name': 'a',
                'type': 'uint128',
            },
            {
                'internalType': 'uint128',
                'name': 's',
                'type': 'uint128',
            },
        ],
        'name': 'buyPrincipalToken',
        'outputs': [
            {
                'internalType': 'uint128',
                'name': '',
                'type': 'uint128',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint128',
                'name': 'a',
                'type': 'uint128',
            },
            {
                'internalType': 'uint128',
                'name': 's',
                'type': 'uint128',
            },
        ],
        'name': 'buyUnderlying',
        'outputs': [
            {
                'internalType': 'uint128',
                'name': '',
                'type': 'uint128',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address[]',
                'name': 't',
                'type': 'address[]',
            },
            {
                'internalType': 'string',
                'name': 'n',
                'type': 'string',
            },
            {
                'internalType': 'string',
                'name': 's',
                'type': 'string',
            },
        ],
        'name': 'createMarket',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'creator',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'lender',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'marketplace',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
        ],
        'name': 'markets',
        'outputs': [
            {
                'components': [
                    {
                        'internalType': 'address[]',
                        'name': 'tokens',
                        'type': 'address[]',
                    },
                    {
                        'internalType': 'address',
                        'name': 'pool',
                        'type': 'address',
                    },
                ],
                'internalType': 'struct MarketPlace.Market',
                'name': '',
                'type': 'tuple',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'b',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'p',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio',
                'type': 'uint256',
            },
        ],
        'name': 'mint',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'p',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio',
                'type': 'uint256',
            },
        ],
        'name': 'mintWithUnderlying',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'redeemer',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint128',
                'name': 'a',
                'type': 'uint128',
            },
            {
                'internalType': 'uint128',
                'name': 's',
                'type': 'uint128',
            },
        ],
        'name': 'sellPrincipalToken',
        'outputs': [
            {
                'internalType': 'uint128',
                'name': '',
                'type': 'uint128',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'uint128',
                'name': 'a',
                'type': 'uint128',
            },
            {
                'internalType': 'uint128',
                'name': 's',
                'type': 'uint128',
            },
        ],
        'name': 'sellUnderlying',
        'outputs': [
            {
                'internalType': 'uint128',
                'name': '',
                'type': 'uint128',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address[]',
                'name': 'a',
                'type': 'address[]',
            },
        ],
        'name': 'setAdapters',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'a',
                'type': 'address',
            },
        ],
        'name': 'setAdmin',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'l',
                'type': 'address',
            },
        ],
        'name': 'setLender',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'a',
                'type': 'address',
            },
        ],
        'name': 'setPool',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'uint8',
                'name': 'p',
                'type': 'uint8',
            },
            {
                'internalType': 'address',
                'name': 'u',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'm',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'a',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'adapter',
                'type': 'address',
            },
            {
                'internalType': 'bytes',
                'name': 'approvalCalldata',
                'type': 'bytes',
            },
        ],
        'name': 'setPrincipal',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'r',
                'type': 'address',
            },
        ],
        'name': 'setRedeemer',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
];
