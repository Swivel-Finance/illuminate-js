export const LENDER_ABI = [
    {
        'inputs': [
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
                'name': 'returned',
                'type': 'uint256',
            },
        ],
        'name': 'Lend',
        'type': 'event',
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
        ],
        'name': 'Mint',
        'type': 'event',
    },
    {
        'inputs': [

        ],
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

        ],
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
        ],
        'name': 'fees',
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
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'r',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'd',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'e',
                'type': 'address',
            },
            {
                'internalType': 'bytes32',
                'name': 'i',
                'type': 'bytes32',
            },
        ],
        'name': 'lend',
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
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'r',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'i',
                'type': 'uint256',
            },
        ],
        'name': 'lend',
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
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'r',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'd',
                'type': 'uint256',
            },
        ],
        'name': 'lend',
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
                'internalType': 'uint128',
                'name': 'a',
                'type': 'uint128',
            },
            {
                'internalType': 'uint256',
                'name': 'r',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'x',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 's',
                'type': 'address',
            },
        ],
        'name': 'lend',
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
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'r',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'd',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 't',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'x',
                'type': 'address',
            },
        ],
        'name': 'lend',
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
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'lend',
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
                'internalType': 'uint256[]',
                'name': 'a',
                'type': 'uint256[]',
            },
            {
                'internalType': 'address',
                'name': 'y',
                'type': 'address',
            },
            {
                'components': [
                    {
                        'internalType': 'bytes32',
                        'name': 'key',
                        'type': 'bytes32',
                    },
                    {
                        'internalType': 'address',
                        'name': 'maker',
                        'type': 'address',
                    },
                    {
                        'internalType': 'address',
                        'name': 'underlying',
                        'type': 'address',
                    },
                    {
                        'internalType': 'bool',
                        'name': 'vault',
                        'type': 'bool',
                    },
                    {
                        'internalType': 'bool',
                        'name': 'exit',
                        'type': 'bool',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'principal',
                        'type': 'uint256',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'premium',
                        'type': 'uint256',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'maturity',
                        'type': 'uint256',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'expiry',
                        'type': 'uint256',
                    },
                ],
                'internalType': 'struct Swivel.Order[]',
                'name': 'o',
                'type': 'tuple[]',
            },
            {
                'components': [
                    {
                        'internalType': 'uint8',
                        'name': 'v',
                        'type': 'uint8',
                    },
                    {
                        'internalType': 'bytes32',
                        'name': 'r',
                        'type': 'bytes32',
                    },
                    {
                        'internalType': 'bytes32',
                        'name': 's',
                        'type': 'bytes32',
                    },
                ],
                'internalType': 'struct Swivel.Components[]',
                'name': 's',
                'type': 'tuple[]',
            },
        ],
        'name': 'lend',
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
                'name': 'a',
                'type': 'uint256',
            },
            {
                'internalType': 'address',
                'name': 'y',
                'type': 'address',
            },
        ],
        'name': 'lend',
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

        ],
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
                'name': 'a',
                'type': 'uint256',
            },
        ],
        'name': 'mint',
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

        ],
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
                'name': 'm',
                'type': 'address',
            },
        ],
        'name': 'setMarketPlaceAddress',
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

        ],
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
        'inputs': [

        ],
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
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'e',
                'type': 'address',
            },
        ],
        'name': 'withdraw',
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