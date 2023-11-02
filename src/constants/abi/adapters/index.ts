import { Principals } from '../../principals.js';
import { Adapter, DEFAULT_ADAPTER } from './adapter.js';
import { ILLUMINATE_ADAPTER } from './illuminate.js';
import { PENDLE_ADAPTER } from './pendle.js';
import { SWIVEL_ADAPTER } from './swivel.js';
import { YIELD_ADAPTER } from './yield.js';

export { Adapter };

export { ApproxParams, SwapData, SwapType, TokenInput, TokenOutput, buildApproxParams, buildTokenInput } from './pendle.js';
export { Order, Protocols } from './swivel.js';

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
    [Principals.Element]: DEFAULT_ADAPTER,
    [Principals.Pendle]: PENDLE_ADAPTER,
    [Principals.Tempus]: DEFAULT_ADAPTER,
    [Principals.Sense]: DEFAULT_ADAPTER,
    [Principals.Apwine]: DEFAULT_ADAPTER,
    [Principals.Notional]: DEFAULT_ADAPTER,
} satisfies Record<Principals, Adapter>;
