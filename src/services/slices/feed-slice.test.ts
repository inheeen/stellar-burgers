import { feedReducer, fetchFeeds } from './feed-slice';
import { TOrder } from '../../utils/types';

const ordersMock: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Бургер 1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1,
    ingredients: []
  },
  {
    _id: '2',
    status: 'done',
    name: 'Бургер 2',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    number: 2,
    ingredients: []
  }
];

describe('feed reducer', () => {
  it('должен устанавливать isLoading=true при fetchFeeds.pending', () => {
    const state = feedReducer(undefined, fetchFeeds.pending('', undefined));

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    });
  });

  it('должен записывать данные и ставить isLoading=false при fetchFeeds.fulfilled', () => {
    const payload = {
      success: true,
      orders: ordersMock,
      total: 50,
      totalToday: 10
    };

    const state = feedReducer(
      {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      },
      fetchFeeds.fulfilled(payload, '', undefined)
    );

    expect(state).toEqual({
      orders: ordersMock,
      total: 50,
      totalToday: 10,
      isLoading: false,
      error: null
    });
  });

  it('должен записывать ошибку и ставить isLoading=false при fetchFeeds.rejected', () => {
    const action = fetchFeeds.rejected(
      new Error('Ошибка загрузки'),
      '',
      undefined
    );

    const state = feedReducer(
      {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      },
      action
    );

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
