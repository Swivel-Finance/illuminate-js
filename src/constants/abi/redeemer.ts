export const REDEEMER_ABI = [
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'l',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 's',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'p',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 't',
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
                'indexed': false,
                'internalType': 'uint8',
                'name': 'principal',
                'type': 'uint8',
            },
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
                'name': 'amount',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'sender',
                'type': 'address',
            },
        ],
        'name': 'Redeem',
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
                'name': 'converter',
                'type': 'address',
            },
        ],
        'name': 'SetConverter',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'fee',
                'type': 'uint256',
            },
        ],
        'name': 'SetFee',
        'type': 'event',
    },
    {
        'inputs': [],
        'name': 'MIN_FEENOMINATOR',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
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
                'name': 'i',
                'type': 'address',
            },
        ],
        'name': 'approve',
        'outputs': [],
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
                'name': 'f',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 't',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'authRedeem',
        'outputs': [
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
                'internalType': 'address[]',
                'name': 'f',
                'type': 'address[]',
            },
        ],
        'name': 'autoRedeem',
        'outputs': [
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
        'name': 'converter',
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
        'name': 'feeChange',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'feenominator',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
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
        'name': 'holdings',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256',
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
        'name': 'marketPlace',
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
                'internalType': 'bool',
                'name': 'b',
                'type': 'bool',
            },
        ],
        'name': 'pauseRedemptions',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function',
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
        'name': 'paused',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'pendleAddr',
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
        'name': 'redeem',
        'outputs': [],
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
                'internalType': 'uint256',
                'name': 's',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'a',
                'type': 'address',
            },
        ],
        'name': 'redeem',
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
        ],
        'name': 'redeem',
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
                'name': 'c',
                'type': 'address',
            },
        ],
        'name': 'setConverter',
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
                'internalType': 'uint256',
                'name': 'f',
                'type': 'uint256',
            },
        ],
        'name': 'setFee',
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
                'name': 'm',
                'type': 'address',
            },
        ],
        'name': 'setMarketPlace',
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
        'name': 'swivelAddr',
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
        'name': 'tempusAddr',
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
];
  