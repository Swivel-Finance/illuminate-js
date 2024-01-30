import { Principals } from '../../principals.js';
import { Adapter, DEFAULT_ADAPTER } from './adapter.js';
import { EXACTLY_ADAPTER } from './exactly.js';
import { ILLUMINATE_ADAPTER } from './illuminate.js';
import { NOTIONAL_ADAPTER } from './notional.js';
import { PENDLE_ADAPTER } from './pendle.js';
import { SWIVEL_ADAPTER } from './swivel.js';
import { TERM_ADAPTER } from './term.js';
import { YIELD_ADAPTER } from './yield.js';

export { ApproxParams, SwapData, SwapType, TokenInput, TokenOutput, buildApproxParams, buildTokenInput, buildTokenOutput } from './pendle.js';
export { Order, Protocols, parseOrder, parseSignature } from './swivel.js';
export { Adapter };

/**
* Adapter ABIs for each principal.
*
* @remarks
* We're co-locating the adapter ABIs with the parameter encoders here because they're closely related. If the ABIs
* change in the future, we'll need to update the parameter encoders as well.
* In the `Lender` we can simply consume the `ADAPTERS` and get type safety for the parameter encoders.
*/
export const ADAPTERS = {
    [Principals.Illuminate]: ILLUMINATE_ADAPTER,
    [Principals.Swivel]: SWIVEL_ADAPTER,
    [Principals.Yield]: YIELD_ADAPTER,
    [Principals.Pendle]: PENDLE_ADAPTER,
    [Principals.Apwine]: DEFAULT_ADAPTER,
    [Principals.Notional]: NOTIONAL_ADAPTER,
    [Principals.Exactly]: EXACTLY_ADAPTER,
    [Principals.Term]: TERM_ADAPTER,
} satisfies Record<Principals, Adapter>;
