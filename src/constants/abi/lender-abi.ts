export const LENDER_ABI = [
    'function admin() public view returns(address)',
    'function marketPlace() public view returns(address)',
    'function swivelAddr() public view returns(address)',
    'function pendleAddr() public view returns(address)',
    'function tempusAddr() public view returns(address)',
    'function feenominator() public view returns(uint256)',
    'function fees(address address) public view returns(uint256)',
    'function mint(uint8 principal, address underlying, uint256 maturity, uint256 amount) public returns (bool)',
];
