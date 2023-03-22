import { TransactionResponse } from 'alchemy-sdk';
import { ReactNode } from 'react';
import { convertToEther } from '../utils';

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
  const valueSentInEther = convertToEther(transaction.value.toString());
  return (
    <div className='flex flex-col justify-items-center rounded-full bg-slate-500 w-full h-fit'>
      <Row>
        <DataPair label='From' data={transaction.from} />
        <DataPair label='To' data={transaction.to} />
      </Row>

      <Row>
        <DataPair label='Value (ETH)' data={valueSentInEther + ' ETH'} />
        <DataPair label='Value (USD)' data={'TODO: add usd value here after redux flow is ready'} />
      </Row>
    </div>
  );
};

export default TransactionBlock;
