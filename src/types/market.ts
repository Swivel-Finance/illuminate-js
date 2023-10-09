export interface Market {
    /**
     * The adapter addresses of the market, indexed by `Principals` enum identifier.
     */
    adapters: string[];
    /**
     * The principal token addresses of the market, indexed by `Principals` enum identifier.
     */
    tokens: string[];
    /**
     * The (YieldSpace) pool address of the market.
     */
    pool: string;
}
