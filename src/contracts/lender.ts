import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { ADAPTERS, ApproxParams, LENDER_ABI, Order, TokenInput } from '../constants/abi/index.js';
import { Principals } from '../constants/index.js';
import { TransactionExecutor, executeTransaction, unwrap } from '../helpers/index.js';

/**
 * The Lender contract wrapper.
 */
export class Lender {

    /**
     * The `Lender` contract has two lend methods, one for lending stablecoins and one for lending ETH.
     */
    static lendSignatures = {
        stable: 'lend(uint8, address, uint256, uint256[], bytes)',
        ether: 'lend(uint8, address, uint256, uint256[], bytes, address, uint256)',
    };

    protected contract: Contract;

    protected executor: TransactionExecutor;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create a Lender contract instance.
     *
     * @param a - address of the deployed Lender contract
     * @param p - ethers provider or signer (for write methods a signer is needed)
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, p: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        this.contract = new Contract(a, LENDER_ABI, p);
        this.executor = e;
    }

    /**
     * Get the contract's hold time.
     *
     * @remarks
     * The hold time is the minimum amount of time the admin must wait before executing a withdrawal.
     *
     * @param o - optional transaction overrides
     */
    async HOLD (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.HOLD(o)).toString();
    }

    /**
     * Get the contract's MIN_FEENOMINATOR
     *
     * @param o - optional transaction overrides
     */
    async MIN_FEENOMINATOR (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.MIN_FEENOMINATOR(o)).toString();
    }

    /**
     * Get the contract's WETH address.
     *
     * @param o - optional transaction overrides
     */
    async WETH (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.WETH(o));
    }

    /**
     * Get the contract's admin address.
     *
     * @param o - optional transaction overrides
     */
    async admin (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin(o));
    }

    /**
     * Get the address of the deployed Lender contract (this is this contract's address).
     *
     * @param o - optional transaction overrides
     */
    async lender (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.lender(o));
    }

    /**
     * Get the address of the deployed Marketplace contract.
     *
     * @param o - optional transaction overrides
     */
    async marketplace (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketplace(o));
    }

    /**
     * Get the address of the deployed Redeemer contract.
     *
     * @param o - optional transaction overrides
     */
    async redeemer (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.redeemer(o));
    }

    /**
     * Get the contract's ETHWrapper address.
     *
     * @remarks
     * The address on which ETH swaps are conducted to purchase LSTs.
     *
     * @param o - optional transaction overrides
     */
    async ETHWrapper (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.ETHWrapper(o));
    }

    /**
     * Get the Curve pool address for a liquid staking token.
     *
     * @remarks
     * The address of the pool used for swapping ETH for LST.
     *
     * @param a - address of the liquid staking token
     * @param o - optional transaction overrides
     */
    async curvePools (a: string, o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.curvePools(a, o));
    }

    /**
     * Check if a principal is paused.
     *
     * @param p - a {@link Principals} identifier
     * @param o - optional transaction overrides
     */
    async paused (p: Principals, o: CallOverrides = {}): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.paused(p, o));
    }

    /**
     * Check if all lending and minting across the entire protocol is halted.
     *
     * @param o - optional transaction overrides
     */
    async halted (o: CallOverrides = {}): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.halted(o));
    }

    /**
     * Get the contract's feenominator.
     *
     * @param o - optional transaction overrides
     */
    async feenominator (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feenominator(o)).toString();
    }

    /**
     * Get the contract's feeChange
     *
     * @param o - optional transaction overrides
     */
    async feeChange (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feeChange(o)).toString();
    }

    /**
     * Get the accrued fees for an underlying token address.
     *
     * @param u - underlying token address
     * @param o - optional transaction overrides
     */
    async fees (u: string, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.fees(u, o)).toString();
    }

    /**
     * Get the hold period for the withdrawal of an underlying token address.
     *
     * @param u - underlying token address
     * @param o - optional transaction overrides
     */
    async withdrawals (u: string, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.withdrawals(u, o)).toString();
    }

    /**
     * Get the contract's maximum value flow.
     *
     * @remarks
     * This is the maximum amount of value that can flow through a protocol in a day in USD and is
     * used as rate limiting protection.
     *
     * @param o - optional transaction overrides
     */
    async maximumValue (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.MAX_VALUE(o)).toString();
    }

    /**
    * Maps protocols to how much value, in USD, has flowed through each protocol.
    *
    * @param p - a {@link Principals} identifier
    * @param o - optional transaction overrides
    */
    async protocolFlow (p: Principals, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.protocolFlow(p, o)).toString();
    }

    /**
     * Maps protocols to the timestamp from which values flowing through protocol has begun.
     *
     * @param p - a {@link Principals} identifier
     * @param o - optional transaction overrides
     */
    async periodStart (p: Principals, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.periodStart(p, o)).toString();
    }

    /**
     * Get the estimated price of ether, as set by the admin.
     *
     * @param o - optional transaction overrides
     */
    async etherPrice (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.etherPrice(o)).toString();
    }

    /**
     * Swap principal tokens for Illuminate's zcTokens.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount being minted
     * @param o - optional transaction overrides
     */
    async mint (p: Principals, u: string, m: BigNumberish, a: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'mint',
            [
                p,
                u,
                BigNumber.from(m),
                BigNumber.from(a),
            ],
            o,
        );
    }

    /**
     * Lend underlying on Illuminate or Yield.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param d - protocol-specific data for the lend method: [pool, minimum]
     *            - [pool] - yieldspace pool that will execute the swap for the illuminate PT
     *            - [minimum] - minimum amount of PTs to buy from the yieldspace pool
     * @param s - optional swap data when lending ETH: [lst, swapMinimum]
     *            - [lst] - address of the liquid staking token to swap to (if not provided, ETH is lent)
     *            - [swapMinimum] - minimum amount of liquid staking tokens to receive from the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Illuminate | Principals.Yield,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        d: [string, BigNumberish],
        s?: [string, BigNumberish] | PayableOverrides,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on Swivel.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - array of amounts of underlying tokens lent to each order in the orders array
     * @param d - protocol-specific data for the lend method: [orders, signatures, pool, swapMinimum, swapFlag]
     *            - [orders] - array of Swivel orders to fill
     *            - [signatures] - array of signatures for each order in the orders array
     *            - [pool] - yieldspace pool that will execute the swap of premium for illuminate PT
     *            - [swapMinimum] - only used if swapFlag is true, the minimum amount of PTs returned for the premium
     *            - [swapFlag] - flag to indicate if returned premium should be swapped in yieldspace pool
     * @param s - optional swap data when lending ETH: [lst, swapMinimum]
     *            - [lst] - address of the liquid staking token to swap to (if not provided, ETH is lent)
     *            - [swapMinimum] - minimum amount of liquid staking tokens to receive from the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Swivel,
        u: string,
        m: BigNumberish,
        a: BigNumberish[],
        d: [Order[], SignatureLike[], string, BigNumberish, boolean],
        s?: [string, BigNumberish] | PayableOverrides,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on Pendle.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param d - protocol-specific data for the lend method: [minimum, market, router, approxParams, tokenInput]
     *            - [minimum] - minimum amount of PTs to buy
     *            - [market] - market to buy PTs from?
     *            - [approxParams] - pendle approxParams
     *            - [tokenInput] - pendle tokenInput
     * @param s - optional swap data when lending ETH: [lst, swapMinimum]
     *            - [lst] - address of the liquid staking token to swap to (if not provided, ETH is lent)
     *            - [swapMinimum] - minimum amount of liquid staking tokens to receive from the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Pendle,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        d: [BigNumberish, string, ApproxParams, TokenInput],
        s?: [string, BigNumberish] | PayableOverrides,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying.
     *
     * @remarks
     * This method is overloaded to support the different lend methods of the different protocols.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - array of amounts of underlying tokens lent to each order in the orders array
     * @param d - protocol-specific data for the lend method (see above)
     * @param s - optional swap data when lending ETH: [lst, swapMinimum]
     *            - [lst] - address of the liquid staking token to swap to (if not provided, ETH is lent)
     *            - [swapMinimum] - minimum amount of liquid staking tokens to receive from the swap
     * @param o - optional transaction overrides
     */
    async lend (
        p: Principals,
        u: string,
        m: BigNumberish,
        a: BigNumberish | BigNumberish[],
        d: unknown[],
        s?: [string, BigNumberish] | PayableOverrides,
        o?: PayableOverrides,
    ): Promise<TransactionResponse> {

        // check if ETH swap params are provided
        const swap = Array.isArray(s)
            ? s
            : [];

        // check if overrides are provided
        const overrides = !Array.isArray(s) && s !== undefined
            ? s
            : o;

        // parse the amount and maturity params
        const amounts = (Array.isArray(a) ? a : [a]).map(amount => BigNumber.from(amount));
        const maturity = BigNumber.from(m);

        // encode the calldata params based on the principal
        let data = '';

        switch (p) {

            case Principals.Illuminate:
            case Principals.Yield:

                data = ADAPTERS[p].lend.encode(
                    d[0] as string,
                    d[1] as BigNumberish,
                );
                break;

            case Principals.Swivel:

                data = ADAPTERS[p].lend.encode(
                    d[0] as Order[],
                    d[1] as SignatureLike[],
                    d[2] as string,
                    d[3] as BigNumberish,
                    d[4] as boolean,
                );
                break;

            case Principals.Pendle:

                data = ADAPTERS[p].lend.encode(
                    d[0] as BigNumberish,
                    d[1] as string,
                    d[2] as ApproxParams,
                    d[3] as TokenInput,
                );
                break;

            default:

                data = ADAPTERS[p].lend.encode(...d);
                break;
        }

        // select the lend method based on the swap params
        const method = swap.length
            ? Lender.lendSignatures.ether
            : Lender.lendSignatures.stable;

        // collect the params for the lend method
        const params = [
            p,
            u,
            maturity,
            amounts,
            data,
            ...swap,
        ] as unknown[];

        // execute the transaction
        return await this.executor(this.contract, method, params, overrides);
    }

    /**
     * Perform multiple batched calls to the Lender contract.
     *
     * @remarks
     * This method uses `delegatecall` for each encoded input.
     *
     * @param c - array of encoded inputs for each call
     */
    async batch (c: string[], o?: PayableOverrides): Promise<TransactionResponse> {

        return await this.executor(this.contract, 'batch', [c], o);
    }
}

// TODO: remove this once v2 is ready

// // example usage

// const L = {} as Lender;

// const pool = '0xYIELDSPACE';
// const usdc = '0xUSDC';
// const weth = '0xWETH';
// const stETH = '0xSTETH';
// const maturity = 1697558534;

// // lend on illuminate

// void L.lend(
//     Principals.Illuminate,
//     usdc,
//     maturity,
//     '100000000',
//     [pool, '99000000'],
// );

// // lend on yield with ETH swap

// void L.lend(
//     Principals.Yield,
//     weth,
//     maturity,
//     '100000000000000000000',
//     [pool, '99000000000000000000'],
//     [stETH, '99990000000000000000'],
// );

// // lend on swivel with ETH swap and custom gas options

// void L.lend(
//     Principals.Yield,
//     weth,
//     maturity,
//     '100000000000000000000',
//     [pool, '99000000000000000000'],
//     [stETH, '99990000000000000000'],
//     { gasLimit: 200000 },
// );

// // lend on swivel

// const amounts = [
//     utils.parseUnits('10', 6).toString(),
//     utils.parseUnits('200', 6).toString(),
// ];

// const orders: Order[] = [
//     {
//         key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
//         protocol: 0,
//         maker: '0xmaker1',
//         underlying: usdc,
//         vault: false,
//         exit: false,
//         principal: '10000000',
//         premium: '1000000',
//         maturity: '12345678',
//         expiry: '22345678',
//     },
//     {
//         key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
//         protocol: 1,
//         maker: '0xmaker2',
//         underlying: usdc,
//         vault: false,
//         exit: false,
//         principal: '200000000',
//         premium: '20000000',
//         maturity: '12345678',
//         expiry: '22345678',
//     },
// ];

// const signatures: SignatureLike[] = [
//     '0xa5af5edd029fb82bef79cae459d8007ff20c078e25114217c921dc60e31ce0a06014954014d6ee16840a1ead70ec6797b64e42532a86edc744a451b07a1bb41d1b',
//     '0xe3dea176cfd7dacd1fe7424f633789b8fc7da0fa23d7e1bd64404bd29d9115d4656c0bf83af468dc5036309403d8f1a0809be0a9db18e314c40fd7f252e6fb971b',
// ];

// const swapMin = utils.parseUnits('15', 6).toString();
// const swap = true;

// void L.lend(
//     Principals.Swivel,
//     usdc,
//     maturity,
//     amounts,
//     [orders, signatures, pool, swapMin, swap],
// );
