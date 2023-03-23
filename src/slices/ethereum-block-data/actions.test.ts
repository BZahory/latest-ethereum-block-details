import { updateLatestBlock, updateLatestEtherPrice } from './actions';

jest.mock('alchemy-sdk', () => ({
  Alchemy: jest.fn().mockImplementation(() => {
    return {
      core: {
        getBlockNumber: async () => 50,
        getBlockWithTransactions: async () => ({
          transactions: ['test1', 'test2'],
        }),
      },
    };
  }),
  Network: jest.fn().mockImplementation(() => {
    return { ETH_MAINNET: 1 };
  }),
}));

jest.mock('axios', () => ({ get: () => Promise.resolve({ ethereum: { usd: 1000 } }) }));

test('updateLatestBlock', async () => {
  const dispatch = jest.fn();

  await updateLatestBlock()(dispatch);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch.mock.calls[0]).toEqual([{ type: 'GET_LATEST_BLOCK_LOADING' }]);
  expect(dispatch.mock.calls[1]).toEqual([
    {
      payload: { transactions: ['test1', 'test2'], blockNumber: 50 },
      type: 'GET_LATEST_BLOCK_SUCCESS',
    },
  ]);
});

test('updateLatestEtherPrice', async () => {
  const dispatch = jest.fn();

  await updateLatestEtherPrice()(dispatch);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch.mock.calls[0]).toEqual([{ type: 'GET_LATEST_ETHER_PRICE_LOADING' }]);
  expect(dispatch.mock.calls[1]).toEqual([
    { payload: { price: 1000 }, type: 'GET_LATEST_ETHER_PRICE_SUCCESS' },
  ]);
});
