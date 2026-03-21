import { ingredientsReducer, fetchIngredients } from './ingredients-slice';
import { TIngredient } from '../../utils/types';

const ingredientsMock: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png'
  },
  {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 20,
    carbohydrates: 20,
    calories: 200,
    price: 200,
    image: 'main.png',
    image_mobile: 'main-mobile.png',
    image_large: 'main-large.png'
  }
];

describe('ingredients reducer', () => {
  it('должен устанавливать isLoading=true при fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );

    expect(state).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  it('должен записывать ингредиенты и ставить isLoading=false при fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      {
        items: [],
        isLoading: true,
        error: null
      },
      fetchIngredients.fulfilled(ingredientsMock, '', undefined)
    );

    expect(state).toEqual({
      items: ingredientsMock,
      isLoading: false,
      error: null
    });
  });

  it('должен записывать ошибку и ставить isLoading=false при fetchIngredients.rejected', () => {
    const action = fetchIngredients.rejected(
      new Error('Ошибка загрузки'),
      '',
      undefined
    );

    const state = ingredientsReducer(
      {
        items: [],
        isLoading: true,
        error: null
      },
      action
    );

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
