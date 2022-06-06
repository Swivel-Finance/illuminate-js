export const MARKETPLACE_ABI = [
    'function admin() public view returns(address)',
    'function redeemer() public view returns(address)',
    'function markets(address underlying, uint256 maturity) public view returns(uint)',
];
