import { BigNumberish, formatEther } from 'ethers';

export const convertToEther = (weiValue: BigNumberish) => formatEther(weiValue);

export const getCurrentTime = (): number => {
  const date = new Date();
  return date.getTime();
};
