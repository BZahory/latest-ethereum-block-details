import { TransactionResponse } from 'alchemy-sdk';
import { ResponseStatus } from '../constants';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ReactNode, useEffect, useState } from 'react';
import {
  getLatestEthereumBlockTransactions,
  getLatestEtherPrice,
  getSelectedTransactionErc20Transfers,
} from 'slices/ethereum-block-data/selector';
import { convertToEther } from '../utils';
import { getErc20Transfers } from 'slices/ethereum-block-data/actions';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const DataPair = ({ label, data }: { label: string; data?: string }) => (
  <div className='flex flex-1 flex-col items-center'>
    <div className='text-xl font-bold'>{label}</div>
    {data ? <div className='text-lg break-all'>{data}</div> : null}
  </div>
);

const Row = ({ children }: { children: ReactNode }) => (
  <div className='flex w-full gap-x-5'>{children}</div>
);

const TransactionBlock = ({ transaction }: { transaction: TransactionResponse }) => {
  const dispatch = useAppDispatch();

  const [isWaiting, setIsWaiting] = useState(false);

  const { price, status } = useAppSelector(getLatestEtherPrice);
  const { blockNumber } = useAppSelector(getLatestEthereumBlockTransactions);
  const { status: selectedTxErc20TransferStatus } = useAppSelector(
    getSelectedTransactionErc20Transfers,
  );

  useEffect(() => {
    if (selectedTxErc20TransferStatus !== ResponseStatus.Loading && isWaiting) setIsWaiting(false);
  }, [selectedTxErc20TransferStatus, isWaiting]);

  const valueSentInEther = convertToEther(transaction.value.toString());
  return (
    <div className='flex flex-col justify-items-center rounded-full bg-slate-500 w-full h-fit p-4'>
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
      <Row>
        <button
          disabled={selectedTxErc20TransferStatus === ResponseStatus.Loading}
          onClick={() => {
            if (!blockNumber) return;
            dispatch(getErc20Transfers(transaction, blockNumber));
            setIsWaiting(true);
          }}
          className={`mx-auto w-fit rounded-md bg-black px-4 py-2 text-white ${
            selectedTxErc20TransferStatus === ResponseStatus.Loading
              ? 'bg-opacity-40'
              : 'bg-opacity-20 hover:bg-opacity-30'
          }`}
        >
          {selectedTxErc20TransferStatus === ResponseStatus.Loading && isWaiting
            ? 'Loading...'
            : 'See ERC-20 Transfers'}
        </button>
      </Row>
    </div>
  );
};

export default TransactionBlock;
