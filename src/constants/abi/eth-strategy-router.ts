export const ETH_STRATEGY_ROUTER_ABI = [
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'weth_',
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
                'indexed': true,
                'internalType': 'address',
                'name': 'strategy',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'baseOut',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'fyTokenOut',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'strategyBurned',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'to',
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
                'name': 'strategy',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'baseIn',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'fyTokenIn',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'strategyMinted',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'to',
                'type': 'address',
            },
        ],
        'name': 'Mint',
        'type': 'event',
    },
    {
        'inputs': [],
        'name': 'WETH',
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
                'name': 'strategy_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'shares_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio_',
                'type': 'uint256',
            },
        ],
        'name': 'burn',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'baseReceived_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'iptReceived_',
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
                'name': 'strategy_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'shares_',
                'type': 'uint256',
            },
        ],
        'name': 'burnDivested',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'received_',
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
                'name': 'strategy_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'shares_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio_',
                'type': 'uint256',
            },
        ],
        'name': 'burnForUnderlying',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'baseReceived_',
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
                'name': 'strategy_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'assets_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'pts_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio_',
                'type': 'uint256',
            },
        ],
        'name': 'mint',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'minted_',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'payable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'strategy_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'assets_',
                'type': 'uint256',
            },
        ],
        'name': 'mintDivested',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'minted_',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'payable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'strategy_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'assets_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'ptsToBuy_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'minRatio_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'maxRatio_',
                'type': 'uint256',
            },
        ],
        'name': 'mintWithUnderlying',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'minted_',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'payable',
        'type': 'function',
    },
];
