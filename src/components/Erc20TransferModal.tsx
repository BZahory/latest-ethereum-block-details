// derived from here: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { clearSelectedTransaction } from 'slices/ethereum-block-data/actions';
import { getSelectedTransactionErc20Transfers } from 'slices/ethereum-block-data/selector';
import { ResponseStatus } from '../constants';

const Erc20TransferModal = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(clearSelectedTransaction());

  const { transfers, status } = useAppSelector(getSelectedTransactionErc20Transfers);

  const TransferDetails = () => (
    <div className='relative p-6 flex-auto'>
      {transfers.length > 0 ? (
        transfers.map((erc20Transfer) => (
          <div key={erc20Transfer.hash}>
            <span className='font-bold'>{erc20Transfer.from}</span> sent{' '}
            <span className='font-extrabold'>
              {String((erc20Transfer.value ?? 'an unknown amount of') + ' ' + erc20Transfer.asset)}
            </span>{' '}
            to <span className='font-bold'>{erc20Transfer.to}</span>
          </div>
        ))
      ) : (
        <div>No transfers found</div>
      )}
    </div>
  );

  return status === ResponseStatus.Fetched ? (
    <>
      <div
        onClick={handleClose}
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
      >
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex flex-col p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>ERC-20 Transfers in Block</h3>
              <h3 className='text-xl text-gray-500 font-semibold'>Ether transfers are included</h3>
            </div>
            {/*body*/}
            <TransferDetails />
            {/*footer*/}
            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
              <button
                onClick={handleClose}
                className='mx-auto w-fit rounded-md bg-red-500 bg-opacity-70 px-4 py-2 text-white hover:bg-opacity-80 '
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  ) : null;
};

export default Erc20TransferModal;
