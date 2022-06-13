```
━━┏┓━┏┓━━━━━━━━━━━━━━━━━━━━━┏┓━━━━━━━━━━━━━━━━━
━━┃┃━┃┃━━━━━━━━━━━━━━━━━━━━┏┛┗┓━━━━━━━━━━┏┓━━━━
┏┓┃┃━┃┃━┏┓┏┓┏┓┏┓┏┓┏━┓━┏━━┓━┗┓┏┛┏━━┓━━━━━━┗┛┏━━┓
┣┫┃┃━┃┃━┃┃┃┃┃┗┛┃┣┫┃┏┓┓┗━┓┃━━┃┃━┃┏┓┃┏━━━┓━┏┓┃━━┫
┃┃┃┗┓┃┗┓┃┗┛┃┃┃┃┃┃┃┃┃┃┃┃┗┛┗┓━┃┗┓┃┃━┫┗━━━┛━┃┃┣━━┃
┗┛┗━┛┗━┛┗━━┛┗┻┻┛┗┛┗┛┗┛┗━━━┛━┗━┛┗━━┛━━━━━━┃┃┗━━┛
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┏┛┃━━━━
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┗━┛━━━━
```
Javascript library for working with the Illuminate Protocol

## Installation

### Installing ethers

In order use `illuminate-js` you'll need a compatible version (`^5.2.0`) of `ethers`. Being a peer dependency, you can use any compatible version of `ethers` you already have installed in your project. 

If you haven't installed a compatible version of `ethers` in your project yet, run:

```bash
npm install --save ethers
```

### Installing illuminate-js

```bash
npm install --save @swivel-finance/illuminate-js
```

## Quickstart

`illuminate-js` provides TypeScript implementations for the 3 main contracts of the Illuminate protocol:

- MarketPlace: Retrieve the Principal Token addresses for a market.
- Lender:
  - Mint Illuminate's Principal Token by depositing external/integrated Principal Tokens you already own.
  - Lend underlying to one of 9 supported lending protocols through Illuminate and receive Illuminate's Principal Token.
- Redeemer: Redeem your Illuminate zcTokens for underlying.

### Usage

#### Principals

Illuminate lets you lend to 9 different lending protocols to ensure you always get the best possible rate. Each of these protocols is referred to as a Principal. You can select a Principal using the `Principals` enum:

```typescript
import { Principals } from '@swivel-finance/illuminate-js';

const principal = Principals.Swivel;
```

or you can use the Principal's numeric value:

```typescript
/**
 * The Principal's numeric values
 * 
 * Illuminate = 0
 * Swivel     = 1
 * Yield      = 2
 * Element    = 3
 * Pendle     = 4
 * Tempus     = 5
 * Sense      = 6
 * Apwine     = 7
 * Notional   = 8
 */ 
 
const principal = 4; // Pendle
```

#### Lend on Illuminate

```typescript
import { Lender, Principals } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed Lender contract
const LENDER_ADDRESS = '0x888cF9ca505189619CAe52721E2C6D31EDCD11F2';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); 

// create an instance of the Lender constract
const lender = new Lender(LENDER_ADDRESS, signer);

// depending on the protocol you want to lend on, different params are required
const underlying = '0xunderlying';
const maturity = '1654638431';
const amount = utils.parseEther('100').toString();
const pool = '0xpool';

// lend on your protocol of choice
const result = await lender.lend(Principals.Yield, underlying, maturity, amount, pool);
```

#### Redeem on Illuminate

```typescript
import { Redeemer, Principals } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed Redeemer contract
const REDEEMER_ADDRESS = '0xa5Ba7D94C6bdCfD50518c00e204304deC17fe54f';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); 

// create an instance of the Redeemer constract
const redeemer = new Redeemer(REDEEMER_ADDRESS, signer);

// depending on the protocol you want to redeem from, different params are required
// most users will only need to redeem Illuminate PTs
const underlying = '0xunderlying';
const maturity = '1654638431';

// redeem your Principal Tokens
const result = await redeemer.redeem(Principals.Yield, underlying, maturity);
```

### Deployed Contract Addresses

You can find the currently deployed illuminate contract addresses here: https://github.com/Swivel-Finance/illuminate#current-deployments

### Other Providers

You can use ethers.js to connect to the Ethereum network in different ways, not only using MetaMask. Please refer to the ethers.js documentation for different ways to connect: https://docs.ethers.io/v5/getting-started/#getting-started--connecting.

Once you have created a provider and a signer, creating a MarketPlace, Lender or Redeemer instance is identical to the steps illustrated above.
