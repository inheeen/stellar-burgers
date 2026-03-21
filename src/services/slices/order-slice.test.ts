import { orderReducer, fetchOrderByNumber, clearOrder } from './order-slice';
import { TOrder } from '../../utils/types';

const orderMock: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Бургер',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 123,
  ingredients: []
};

describe('order reducer', () => {
  it('должен устанавливать isLoading=true при fetchOrderByNumber.pending', () => {
    const state = orderReducer(undefined, fetchOrderByNumber.pending('', 123));

    expect(state).toEqual({
      order: null,
      isLoading: true,
      error: null
    });
  });

  it('должен записывать заказ и ставить isLoading=false при fetchOrderByNumber.fulfilled', () => {
    const state = orderReducer(
      {
        order: null,
        isLoading: true,
        error: null
      },
      fetchOrderByNumber.fulfilled(orderMock, '', 123)
    );

    expect(state).toEqual({
      order: orderMock,
      isLoading: false,
      error: null
    });
  });

  it('должен записывать null если заказ не найден', () => {
    const state = orderReducer(
      {
        order: orderMock,
        isLoading: true,
        error: null
      },
      fetchOrderByNumber.fulfilled(null, '', 123)
    );

    expect(state).toEqual({
      order: null,
      isLoading: false,
      error: null
    });
  });

  it('должен записывать ошибку при fetchOrderByNumber.rejected', () => {
    const action = fetchOrderByNumber.rejected(
      new Error('Ошибка загрузки'),
      '',
      123
    );

    const state = orderReducer(
      {
        order: null,
        isLoading: true,
        error: null
      },
      action
    );

    expect(state).toEqual({
      order: null,
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });

  it('должен очищать заказ при clearOrder', () => {
    const state = orderReducer(
      {
        order: orderMock,
        isLoading: false,
        error: null
      },
      clearOrder()
    );

    expect(state.order).toBeNull();
  });
});
