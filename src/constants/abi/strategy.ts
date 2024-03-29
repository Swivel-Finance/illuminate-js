// the generated ABI for the Strategy contract already contains the ERC20 interface
// if it didn't, this is how we could mix it into the strategy ABI manually:

// import { FormatTypes, Interface } from 'ethers/lib/utils.js';
// import { ERC20_ABI } from './erc20.js';

// const ERC20_INTERFACE = new Interface(ERC20_ABI);
// const ERC20_JSON_ABI = JSON.parse(ERC20_INTERFACE.format(FormatTypes.json) as string) as unknown[];

export const STRATEGY_ABI = [
    // the generated ABI for the Strategy contract already contains the ERC20 interface
    // if it didn't, this is how we could mix it into the strategy ABI manually:
    // ...ERC20_JSON_ABI,
    {
        'inputs': [
            {
                'internalType': 'string',
                'name': 'name_',
                'type': 'string',
            },
            {
                'internalType': 'string',
                'name': 'symbol_',
                'type': 'string',
            },
            {
                'internalType': 'contract IFYToken',
                'name': 'fyToken_',
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
                'name': 'owner',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'spender',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'value',
                'type': 'uint256',
            },
        ],
        'name': 'Approval',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'lpTokenDivested',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'baseObtained',
                'type': 'uint256',
            },
        ],
        'name': 'Divested',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'lpTokenDivested',
                'type': 'uint256',
            },
        ],
        'name': 'Drained',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'lpTokenDivested',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'baseObtained',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'fyTokenObtained',
                'type': 'uint256',
            },
        ],
        'name': 'Ejected',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'pool',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'baseInvested',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'lpTokensObtained',
                'type': 'uint256',
            },
        ],
        'name': 'Invested',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'soldFYToken',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'returnedBase',
                'type': 'uint256',
            },
        ],
        'name': 'SoldFYToken',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'sent',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'received',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amountIn',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amountOut',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'receiver',
                'type': 'address',
            },
        ],
        'name': 'Trade',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'from',
                'type': 'address',
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'to',
                'type': 'address',
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'value',
                'type': 'uint256',
            },
        ],
        'name': 'Transfer',
        'type': 'event',
    },
    {
        'inputs': [],
        'name': 'DOMAIN_SEPARATOR',
        'outputs': [
            {
                'internalType': 'bytes32',
                'name': '',
                'type': 'bytes32',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'PERMIT_TYPEHASH',
        'outputs': [
            {
                'internalType': 'bytes32',
                'name': '',
                'type': 'bytes32',
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
                'name': 'owner',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'spender',
                'type': 'address',
            },
        ],
        'name': 'allowance',
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
                'name': 'spender',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'wad',
                'type': 'uint256',
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
                'internalType': 'address',
                'name': 'base_',
                'type': 'address',
            },
        ],
        'name': 'approveUnderlying',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'guy',
                'type': 'address',
            },
        ],
        'name': 'balanceOf',
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
        'name': 'base',
        'outputs': [
            {
                'internalType': 'contract IERC20',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'baseCached',
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
                'name': 'to',
                'type': 'address',
            },
        ],
        'name': 'burn',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'poolTokensObtained',
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
                'name': 'to',
                'type': 'address',
            },
        ],
        'name': 'burnDivested',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'baseObtained',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'contract IPool',
                'name': 'pool_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'poolTokens',
                'type': 'uint256',
            },
        ],
        'name': 'burnPoolTokens',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'baseReceived',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'fyTokenReceived',
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
                'name': 'fyTokenTo',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'baseTo',
                'type': 'address',
            },
        ],
        'name': 'buyFYToken',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'soldFYToken',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'returnedBase',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [
            {
                'internalType': 'uint8',
                'name': '',
                'type': 'uint8',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'deploymentChainId',
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
        'name': 'divest',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'baseObtained',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'eject',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'baseReceived',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'fyTokenReceived',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'fyToken',
        'outputs': [
            {
                'internalType': 'contract IFYToken',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'fyTokenCached',
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
                'name': 'to',
                'type': 'address',
            },
        ],
        'name': 'init',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'minted',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'internalType': 'contract IPool',
                'name': 'pool_',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'initial_',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'ptsToSell_',
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
            {
                'internalType': 'bytes[]',
                'name': 'lends_',
                'type': 'bytes[]',
            },
        ],
        'name': 'invest',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'poolTokensObtained',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
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
        'name': 'maturity',
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
                'name': 'to',
                'type': 'address',
            },
        ],
        'name': 'mint',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'minted',
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
                'name': 'to',
                'type': 'address',
            },
        ],
        'name': 'mintDivested',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'minted',
                'type': 'uint256',
            },
        ],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [
            {
                'internalType': 'string',
                'name': '',
                'type': 'string',
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
        'name': 'nonces',
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
                'name': 'owner',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'spender',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256',
            },
            {
                'internalType': 'uint256',
                'name': 'deadline',
                'type': 'uint256',
            },
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
        'name': 'permit',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'pool',
        'outputs': [
            {
                'internalType': 'contract IPool',
                'name': '',
                'type': 'address',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'poolCached',
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
        'name': 'restart',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'baseIn',
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
                'name': 'a',
                'type': 'address',
            },
        ],
        'name': 'setAdmin',
        'outputs': [],
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
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'state',
        'outputs': [
            {
                'internalType': 'enum IStrategy.State',
                'name': '',
                'type': 'uint8',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [
            {
                'internalType': 'string',
                'name': '',
                'type': 'string',
            },
        ],
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [],
        'name': 'totalSupply',
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
                'name': 'dst',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'wad',
                'type': 'uint256',
            },
        ],
        'name': 'transfer',
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
                'name': 'src',
                'type': 'address',
            },
            {
                'internalType': 'address',
                'name': 'dst',
                'type': 'address',
            },
            {
                'internalType': 'uint256',
                'name': 'wad',
                'type': 'uint256',
            },
        ],
        'name': 'transferFrom',
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
        'name': 'version',
        'outputs': [
            {
                'internalType': 'string',
                'name': '',
                'type': 'string',
            },
        ],
        'stateMutability': 'pure',
        'type': 'function',
    },
];
