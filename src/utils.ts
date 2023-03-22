import { BigNumberish, formatEther } from 'ethers';

export const convertToEther = (weiValue: BigNumberish) => formatEther(weiValue);
