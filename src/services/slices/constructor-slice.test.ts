import {
  addIngredient,
  burgerConstructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from './constructor-slice';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

const bun: TIngredient = {
  _id: 'bun-1',
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
};

const main1: TIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 200,
  image: 'main1.png',
  image_mobile: 'main1-mobile.png',
  image_large: 'main1-large.png'
};

const main2: TIngredient = {
  _id: 'main-2',
  name: 'Сыр',
  type: 'main',
  proteins: 30,
  fat: 30,
  carbohydrates: 30,
  calories: 300,
  price: 300,
  image: 'main2.png',
  image_mobile: 'main2-mobile.png',
  image_large: 'main2-large.png'
};

describe('burgerConstructor reducer', () => {
  it('должен добавлять булку в constructorItems.bun', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(bun));

    expect(state.constructorItems.bun).toMatchObject({
      _id: bun._id,
      name: bun.name,
      type: bun.type
    });

    expect(state.constructorItems.ingredients).toEqual([]);
  });

  it('должен добавлять начинку в constructorItems.ingredients', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(main1));

    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      _id: main1._id,
      name: main1.name,
      type: main1.type
    });
    expect(state.constructorItems.ingredients[0].id).toBeDefined();
  });

  it('должен удалять ингредиент по id', () => {
    const ingredient1 = addIngredient(main1).payload as TConstructorIngredient;
    const ingredient2 = addIngredient(main2).payload as TConstructorIngredient;

    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      currentIngredient: null,
      error: null
    };

    const state = burgerConstructorReducer(
      initialState,
      removeIngredient(ingredient1.id)
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0].id).toBe(ingredient2.id);
  });

  it('должен перемещать ингредиент вверх', () => {
    const ingredient1 = addIngredient(main1).payload as TConstructorIngredient;
    const ingredient2 = addIngredient(main2).payload as TConstructorIngredient;

    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      currentIngredient: null,
      error: null
    };

    const state = burgerConstructorReducer(initialState, moveIngredientUp(1));

    expect(state.constructorItems.ingredients[0].id).toBe(ingredient2.id);
    expect(state.constructorItems.ingredients[1].id).toBe(ingredient1.id);
  });

  it('должен перемещать ингредиент вниз', () => {
    const ingredient1 = addIngredient(main1).payload as TConstructorIngredient;
    const ingredient2 = addIngredient(main2).payload as TConstructorIngredient;

    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      currentIngredient: null,
      error: null
    };

    const state = burgerConstructorReducer(initialState, moveIngredientDown(0));

    expect(state.constructorItems.ingredients[0].id).toBe(ingredient2.id);
    expect(state.constructorItems.ingredients[1].id).toBe(ingredient1.id);
  });
});
