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

- MarketPlace (retrieve the Principal Token addresses for a market)
- Lender (mint Illuminate's zcToken from Principal Tokens you already own or lend underlying to one of 9 supported lending protocols through Illuminate and receive Illuminate's zcToken)
- Redeemer (redeem your Illuminate zcTokens for underlying)

### Usage

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

// you'll need the address of the deployed Lender contract
const REDEEMER_ADDRESS = '0xa5Ba7D94C6bdCfD50518c00e204304deC17fe54f';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); 

// create an instance of the Lender constract
const redeemer = new Redeemer(REDEEMER_ADDRESS, signer);

// depending on the protocol you want to redeem from, different params are required
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
