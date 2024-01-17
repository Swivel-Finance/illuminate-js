```
╭╮╭╮ ╭╮            ╭╮           ╭╮            ╭╮      
╰╯││ ││            ╰╯           ││            ╰╯      
╭╮││ ││ ╭╮ ╭╮╭────╮╭╮╭───╮╭───╮╭╯╰╮╭───╮      ╭╮╭────╮
││││ ││ ││ │││╭╮╭╮││││╭─╮│╰──╮│╰╮╭╯│╭─ │ ╭──╮ │││╭───╯
││││ ││ ││ ││││││││││││ ││╭──╯│ ││ │╭──╯ ╰──╯ ││╰────╮
│││╰╮│╰╮│╰─╯│││││││││││ │││╰─ ╰╮│╰╮│╰───╮    ╭╯│╭───╯│
╰╯╰─╯╰─╯╰───╯╰╯╰╯╰╯╰╯╰╯ ╰╯╰────╯╰─╯╰────╯    ╰─╯╰────╯
```
TypeScript library for working with the Illuminate Protocol

## Installation

### Installing ethers

In order use `illuminate-js` you'll need a compatible version (`^5.2.0`) of `ethers`. Being a peer dependency, you can 
use any compatible version of `ethers` you already have installed in your project. 

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

- `MarketPlace`: 
  - Retrieve market information (iPT and pool addresses).
  - Buy and sell iPTs using Illuminate's secondary on-chain markets (YieldSpace AMM).
- `Lender`:
  - Mint Illuminate's Principal Token (iPT) by depositing external/integrated Principal Tokens you already own.
  - Lend underlying to one of 8 supported lending protocols through Illuminate and receive Illuminate's Principal Token (iPT).
- `Redeemer`: 
  - Redeem your Illuminate Principal Tokens (iPT) for underlying.

In addition, `illuminate-js` provides TypeScript implementations for Illuminate's `Strategy` and `StrategyRouter` 
contracts. These contracts allow you to pool your Principal Tokens (iPT) in exchange for Strategy Shares, which earn 
additional yield, support auto-rollover and can be burned for underlying at any time.

### Usage

#### Principals

Illuminate lets you lend to 8 different lending protocols to ensure you always get the best possible rate. Each of these 
protocols is referred to as a Principal. You can select a Principal using the `Principals` enum:

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
 * Pendle     = 3
 * APWine     = 4
 * Notional   = 5
 * Exactly    = 6
 * Term       = 7
 */ 
 
const principal = 3; // Pendle
```

#### Lend on Illuminate

When lending on Illuminate, you will receive Illuminate's Principal Tokens (iPT) in exchange for your underlying, 
regardless of which Principal/Protocol you lend to.

> Make sure to also approve the `Lender` contract to spend your underlying before lending.

##### Lending to a protocol of your choice

```typescript
import { Lender, Principals } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed Lender contract
const LENDER_ADDRESS = '0xILLUMINATE_LENDER_ADDRESS';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// create an instance of the Lender constract
const lender = new Lender(LENDER_ADDRESS, signer);

// specify the market you want to lend on and the amount you want to lend
const underlying = '0xUNDERLYING_TOKEN_ADDRESS';
const maturity = '1735448400';
const amount = ethers.utils.parseEther('100').toString();

// depending on the protocol you want to lend on, different params are required
// the Lender contract source documents the required params for each principal
// here, we will lend to Yield, which requires a yieldspace pool address and a 
// minimum amount of principal tokens to mint (a slippage protection)
const principal = Principals.Yield;
const pool = '0xPOOL_ADDRESS';
const minimum = ethers.utils.parseEther('99').toString();

// if this is your first time lending this underlying, you'll need to approve
// the Lender contract to spend your underlying (see in the next section)

// lend your underlying to the protocol of your choice
const result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum]);
```

##### Approving the Lender contract to spend your underlying

If you're lending a specific underlying for the first time, you'll need to approve the Lender contract to spend your 
underlying. You can do this by calling the `approve` method on your underlying's token contract - `illuminate-js` 
provides an `ERC20` implementation for this purpose:

```typescript
import { ERC20 } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed Lender contract
const LENDER_ADDRESS = '0xILLUMINATE_LENDER_ADDRESS';

// you'll need the address of the underlying token you want to lend
const underlying = '0xUNDERLYING_TOKEN_ADDRESS';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// create an instance of the ERC20 constract
const token = new ERC20(underlying, signer);

// you can choose to approve the maximum amount of underlying if you
// don't want to approve the Lender contract again in the future
// or just approve the amount you want to lend this time
const amount = ethers.constants.MaxUint256;

// approve the Lender contract to spend your underlying
const result = await token.approve(LENDER_ADDRESS, amount);
```

##### Lending to the protocol with the best rate

The previous examples assume you know which Protocol/Principal you want to lend to. You can always use 
https://app.illuminate.finance/ to find the best rate for your underlying. Alternatively, you can request a quote from
Illuminate's public API to find the best rate for your underlying. 

Check out our [API documentation](https://docs.illuminate.finance/illuminapi/get/get-quotes) for more details.

In general, the `quotes` endpoint will return an array of `Quote`s, each containing the following information:

```typescript
export interface Quote<T = QuoteMeta> {
    principal: Principals;
    maturity: string;
    amount: string;
    fee: string;
    apr: string;
    underlying: {
        address: string;
        decimals: number;
    };
    pt: {
        address: string;
        decimals: number;
        maturity: string;
        amount: string;
        meta?: T;
    },
}

export type QuoteMeta = {
    [key: string]: unknown;
};
```

The `QuoteMeta` is left generic, as it will be different for each Principal. For example, the `QuoteMeta` for the
`Principals.Yield` protocol will contain the `poolAddress` parameter required by the `Lender` contract:

```typescript
export type YieldQuoteMeta = {
    poolAddress: string;
};
```

To fetch the quotes for your underlying, make a `GET` request to the `quotes` endpoint:

```typescript
const fetchQuotes = async (underlying: string, maturity: string, amount: string): Promise<Quote[]> => {

    // you'll need Illuminate's public API URL (see API docs)
    const API_URL = 'https://illumigate.swivel.exchange/v3/';
    
    // the endpoint for fetching quotes
    const endpoint = 'quotes';

    // the params for the quotes endpoint
    const params = {
        underlying, // e.g.: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 (USDC)
        maturity,   // e.g.: 1735448400 (December 29, 2024)
        amount,     // e.g.: 20000000 (20 USDC)
    };

    // the request init object for the fetch call
    const init: RequestInit = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    };

    const url = new URL(`${ API_URL }${ endpoint }`);

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, init);

    const quotes = await response.json();

    return quotes;
};

```

With the list of quotes, you can find the best rate/quote for your underlying by comparing the `apr` of each quote:

```typescript
const bestQuote = (quotes: Quote[]): Quote => {

    let best = quotes[0];

    quotes.forEach(quote => {

        const apr = parseFloat(quote.apr ?? '0');

        if (parseFloat(best.apr ?? '0') < apr) {

            best = quote;
        }
    });

    return best;
};

const quotes = await fetchQuotes(underlying, maturity, amount);

const best = bestQuote(quotes);
```

Once you have the best quote, you can lend to the protocol with the best rate:

```typescript
import { Lender } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed Lender contract
const LENDER_ADDRESS = '0xILLUMINATE_LENDER_ADDRESS';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// create an instance of the Lender constract
const lender = new Lender(LENDER_ADDRESS, signer);

// specify the market you want to lend on and the amount you want to lend
const underlying = '0xUNDERLYING_TOKEN_ADDRESS';
const maturity = '1735448400';
const amount = ethers.utils.parseEther('100').toString();

// specify your slippage protection (minimum amount of PTs to return)
const minimum = ethers.utils.parseEther('99').toString();

// get the quotes for your selected market and amount
const quotes = await fetchQuotes(underlying, maturity, amount);

// find the best quote
const best = bestQuote(quotes);

// assuming the best quote is for the Yield protocol, you can now lend like this:
const response = await lender.lend(
    quote.principal,
    quote.underlying.address,
    quote.maturity,
    quote.amount,
    [
        (quote.pt.meta as YieldQuoteMeta).poolAddress,
        minimum,
    ],
);
```

#### Redeem on Illuminate

Because Illuminate mints its own Illuminate Principal Tokens (iPT) when you lend, you'll only need to redeem your iPT 
at maturity, regardless of which Principal/Protocol you lent to. In fact, your lend position can be composed of multiple
different Principals, and you'll still only need to redeem your iPT at maturity.

##### Redeeming matured positions

```typescript
import { Redeemer, Principals } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed Redeemer contract
const REDEEMER_ADDRESS = '0xILLUMINATE_REDEEMER_ADDRESS';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); 

// create an instance of the Redeemer constract
const redeemer = new Redeemer(REDEEMER_ADDRESS, signer);

// specify the market you want to redeem from
const underlying = '0xUNDERLYING_TOKEN_ADDRESS';
const maturity = '1735448400';

// redeem your Illuminate Principal Tokens (iPT)
// NOTE: Illuminate will always redeem your entire iPT balance
const result = await redeemer.redeem(Principals.Illuminate, underlying, maturity);
```

##### Redeeming un-matured positions

Illuminate Principal Tokens (iPT) can only be redeemed after maturity. However, you can sell your iPT using Illuminate's
secondary on-chain markets, utilizing [YieldSpace's AMM](https://docs.illuminate.finance/illuminate-defi-fixed/yieldspace-amm).
You can use the `MarketPlace` contract to do this:
 
> Make sure to also approve the `MarketPlace` contract to spend your iPT before selling.

```typescript
import { MarketPlace } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed MarketPlace contract
const MARKETPLACE_ADDRESS = '0xILLUMINATE_MARKETPLACE_ADDRESS';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); 

// create an instance of the MarketPlace constract
const marketplace = new MarketPlace(MARKETPLACE_ADDRESS, signer);

// specify the market...
const underlying = '0xUNDERLYING_TOKEN_ADDRESS';
const maturity = '1735448400';
// ...the amount of iPT you want to sell...
const amount = ethers.utils.parseEther('100').toString();
// ...and the minimum amount of underlying you want to receive (slippage cap)
const minimum = ethers.utils.parseEther('99').toString();

// if this is your first time selling this market's iPT, you'll need to approve
// the MarketPlace contract to spend your iPT (see in the next section)

// sell your Illuminate Principal Tokens (iPT)
const result = await marketplace.sellPrincipalToken(underlying, maturity, amount, minimum);
```

##### Approving the MarketPlace contract to spend your iPT

If you're selling a specific iPT for the first time, you'll need to approve the MarketPlace contract to spend your iPT. 
You can do this by calling the `approve` method on your iPT's token contract - `illuminate-js` provides an `ERC20` 
implementation for this purpose:

```typescript
import { ERC20 } from '@swivel-finance/illuminate-js';
import ethers from 'ethers';

// you'll need the address of the deployed MarketPlace contract
const MARKETPLACE_ADDRESS = '0xILLUMINATE_MARKETPLACE_ADDRESS';

// you'll need the address of the Illuminate Principal Token (iPT) 
// you want to sell
const ipt = '0xIPT_ADDRESS';

// create an ethers signer to perform payable transactions
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// create an instance of the ERC20 constract
const token = new ERC20(ipt, signer);

// you can choose to approve the maximum amount of ipt if you don't 
// want to approve the MarketPlace contract again in the future
// or just approve the amount you want to sell this time
const amount = ethers.constants.MaxUint256;

// approve the MarketPlace contract to spend your iPT
const result = await token.approve(MARKETPLACE_ADDRESS, amount);
```

### Deployed Contract Addresses

You can find the currently deployed illuminate contract addresses here: https://github.com/Swivel-Finance/illuminate#current-deployments

### Other Providers

You can use ethers.js to connect to the Ethereum network in different ways, not only using MetaMask. Please refer to the 
ethers.js documentation for different ways to connect: https://docs.ethers.io/v5/getting-started/#getting-started--connecting.

Once you have created a provider and a signer, creating a MarketPlace, Lender or Redeemer instance is identical to the 
steps illustrated above.
