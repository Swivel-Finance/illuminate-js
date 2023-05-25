export const enum StrategyState {
    DEPLOYED,
    DIVESTED,
    INVESTED,
    EJECTED,
    DRAINED
}

export const StrategyStateNames = {
    [StrategyState.DEPLOYED]: 'DEPLOYED',
    [StrategyState.DIVESTED]: 'DIVESTED',
    [StrategyState.INVESTED]: 'INVESTED',
    [StrategyState.EJECTED]: 'EJECTED',
    [StrategyState.DRAINED]: 'DRAINED',
} as const;
