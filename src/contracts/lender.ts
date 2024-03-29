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
        stable: 'lend(uint8,address,uint256,uint256[],bytes)',
        ether: 'lend(uint8,address,uint256,uint256[],bytes,address,uint256)',
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
    async hold (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.hold(o)).toString();
    }

    /**
     * Get the contract's minimum feenominator value.
     *
     * @param o - optional transaction overrides
     */
    async minimumFeenominator (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.minimumFeenominator(o)).toString();
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
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    async feenominator (m: BigNumberish, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feenominator(BigNumber.from(m), o)).toString();
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

        return unwrap<BigNumber>(await this.contract.functions.maximumValue(o)).toString();
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
     * Convert a principal token's decimal amount to underlying's decimal amount
     *
     * @param u - address of an underlying asset
     * @param p - address of a principal token
     * @param a - amount denominated in principal token's decimals
     * @param o - optional transaction overrides
     */
    async convertDecimals (u: string, p: string, a: BigNumberish, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.convertDecimals(u, p, a, o)).toString();
    }

    /**
     * Check if an external protocol's principal token is supported for minting Illuminate PTs.
     *
     * @param t - the address of the principal token to check
     * @param o - optional transaction overrides
     */
    async validToken (t: string, o: CallOverrides = {}): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.validToken(t, o));
    }

    /**
     * Swap principal tokens for Illuminate's zcTokens.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param t - address of the principal token to deposit
     * @param a - amount being minted
     * @param o - optional transaction overrides
     */
    async mint (
        p: Principals,
        u: string,
        m: BigNumberish,
        t: string,
        a: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'mint',
            [
                p,
                u,
                BigNumber.from(m),
                t,
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
     * @remarks
     * To obtain the `approxParams` and `tokenInput` parameters, use the {@link buildApproxParams} and
     * {@link buildTokenInput} helper functions.
     *
     * @example
     * ```typescript
     * import { Lender, Principals } from '@swivel-finance/illuminate-js';
     * import { buildApproxParams, buildTokenInput } from '@swivel-finance/illuminate-js/build/constants/abi/adapters/pendle';
     *
     * const provider = new providers.Web3Provider(window.ethereum);
     * const signer = provider.getSigner();
     *
     * const lender = new Lender('0xIlluminateLenderAddress', signer);
     *
     * // set Pendle as principal
     * const principal = Principals.Pendle;
     * // the underlying token address of Illuminate's market
     * const underlying = '0xUnderlyingTokenAddress';
     * // the maturity timestamp of Illuminate's market
     * const maturity = 1697558534;
     * // the amount of underlying tokens to lend
     * const amount = utils.parseEther('100').toString();
     *
     * // the address of Pendle's market to buy PTs from (use Illuminate's Quote API to get this)
     * const pendleMarket = '0xPendleMarketAddress';
     * // the expected amount of PTs to receive (use Illuminate's Quote API to get this)
     * const amountOut = utils.parseEther('100').toString();
     * // the tolerated slippage when buying PTs
     * const slippage = 0.01;
     *
     * // build Pendle's ApproxParams struct
     * const approxParams = buildApproxParams(amountOut, slippage);
     * // build Pendle's TokenInput struct
     * const tokenInput = buildTokenInput(amount, underlying);
     * // the minimum can be obtained from the `guessMin` property of `approxParams`
     * const minimum = approxParams.guessMin;
     *
     * const result = await lender.lend(principal, underlying, maturity, amount, [minimum, market, approxParams, tokenInput]);
     * ```
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
     * Lend underlying on Notional.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param d - protocol-specific data for the lend method: [<empty>]
     * @param s - optional swap data when lending ETH: [lst, swapMinimum]
     *            - [lst] - address of the liquid staking token to swap to (if not provided, ETH is lent)
     *            - [swapMinimum] - minimum amount of liquid staking tokens to receive from the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Notional,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        d: [],
        s?: [string, BigNumberish] | PayableOverrides,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on Exactly.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param d - protocol-specific data for the lend method: [exactlyMaturity, minimumAssets]
     *            - [exactlyMaturity] - maturity of the exactly market
     *            - [minimumAssets] - minimum amount of principal tokens to receive when lending
     * @param s - optional swap data when lending ETH: [lst, swapMinimum]
     *            - [lst] - address of the liquid staking token to swap to (if not provided, ETH is lent)
     *            - [swapMinimum] - minimum amount of liquid staking tokens to receive from the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Exactly,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        d: [BigNumberish, BigNumberish],
        s?: [string, BigNumberish] | PayableOverrides,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lending on Term is not supported.
     *
     * @throws Lending on Term is not supported.
     *
     * @remarks
     * We only have this here to document that lending on Term is not supported.
     * This method will `throw` if called!
     */
    lend (
        p: Principals.Term,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        d: [],
        s?: [string, BigNumberish] | PayableOverrides,
        o?: PayableOverrides,
    ): Promise<never>;

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
            ? [s[0], BigNumber.from(s[1])]
            : [];

        // check if overrides are provided
        const overrides = !Array.isArray(s) && s !== undefined
            ? s
            : o ?? {};

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

            case Principals.Notional:

                data = ADAPTERS[p].lend.encode(...(d as []));
                break;

            case Principals.Exactly:

                data = ADAPTERS[p].lend.encode(
                    d[0] as BigNumberish,
                    d[1] as BigNumberish,
                );
                break;

            case Principals.Term:

                // this will throw, as we don't support lending on Term
                data = ADAPTERS[p].lend.encode();
                break;

            default:

                data = ADAPTERS[p].lend.encode(...d);
                break;
        }

        let method = Lender.lendSignatures.stable;

        if (swap.length) {

            // for ETH lends we need to choose the appropriate lend method signature
            method = Lender.lendSignatures.ether;

            // for ETH lends we need to include the ETH amount as value in the overrides
            overrides.value = amounts.reduce(
                (total, current) => total.add(current),
                BigNumber.from(0),
            );
        }

        // collect the params for the lend method
        const params = [
            p,
            u,
            maturity,
            amounts,
            data,
            ...swap,
        ];

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
