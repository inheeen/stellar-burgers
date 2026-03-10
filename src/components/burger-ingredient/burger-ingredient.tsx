import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/selectors';
import { addIngredient } from '../../services/slices/constructor-slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const bun = useSelector(selectConstructorBun);
    const ingredients = useSelector(selectConstructorIngredients);

    const count =
      ingredient.type === 'bun'
        ? bun?._id === ingredient._id
          ? 2
          : 0
        : ingredients.filter((item) => item._id === ingredient._id).length;

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
