import {
  profileOrdersReducer,
  fetchProfileOrders
} from './profile-orders-slice';
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

describe('profileOrders reducer', () => {
  it('должен устанавливать isLoading=true при fetchProfileOrders.pending', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.pending('', undefined)
    );

    expect(state).toEqual({
      orders: [],
      isLoading: true,
      error: null
    });
  });

  it('должен записывать заказы и ставить isLoading=false при fetchProfileOrders.fulfilled', () => {
    const state = profileOrdersReducer(
      {
        orders: [],
        isLoading: true,
        error: null
      },
      fetchProfileOrders.fulfilled(ordersMock, '', undefined)
    );

    expect(state).toEqual({
      orders: ordersMock,
      isLoading: false,
      error: null
    });
  });

  it('должен записывать ошибку и ставить isLoading=false при fetchProfileOrders.rejected', () => {
    const action = fetchProfileOrders.rejected(
      new Error('Ошибка загрузки'),
      '',
      undefined
    );

    const state = profileOrdersReducer(
      {
        orders: [],
        isLoading: true,
        error: null
      },
      action
    );

    expect(state).toEqual({
      orders: [],
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
