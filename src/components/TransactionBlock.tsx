import { TransactionResponse } from 'alchemy-sdk';
import { ResponseStatus } from '../constants';
import { useAppSelector } from 'hooks/redux';
import { ReactNode } from 'react';
import { getLatestEtherPrice } from 'slices/ethereum-block-data/selector';
import { convertToEther } from '../utils';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const DataPair = ({ label, data }: { label: string; data?: string }) => (
  <div className='flex flex-1 flex-col items-center'>
    <div>{label}</div>
    {data ? <div>{data}</div> : null}
  </div>
);

const Row = ({ children }: { children: ReactNode }) => (
  <div className='flex w-full gap-x-5'>{children}</div>
);

const TransactionBlock = ({ transaction }: { transaction: TransactionResponse }) => {
  const { price, status } = useAppSelector(getLatestEtherPrice);

  const valueSentInEther = convertToEther(transaction.value.toString());
  return (
    <div className='flex flex-col justify-items-center rounded-full bg-slate-500 w-full h-fit'>
      <Row>
        <DataPair label='From' data={transaction.from} />
        <DataPair label='To' data={transaction.to} />
      </Row>

      <Row>
        <DataPair label='Value (ETH)' data={valueSentInEther + ' ETH'} />
        {price && status === ResponseStatus.Fetched ? (
          <DataPair label='Value (USD)' data={formatter.format(Number(valueSentInEther) * price)} />
        ) : null}
      </Row>
    </div>
  );
};

export default TransactionBlock;
