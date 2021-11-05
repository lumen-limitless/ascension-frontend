import { ethers } from "ethers";

export const contractCallFetcher = (
    ...parameters: [ethers.Contract, string, ...any]
) => {
    const [param1, param2, ...otherParams] = parameters;

    const contract = param1;
    const method = param2;

    return contract[method](...otherParams);
};
