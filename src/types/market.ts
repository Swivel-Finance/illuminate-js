import { Struct } from './struct.js';

export interface Market extends Struct {
    /**
     * The principal token addresses of the market, indexed by `Principals` enum identifier.
     */
    tokens: string[];
    /**
     * The (YieldSpace) pool address of the market.
     */
    pool: string;
}
