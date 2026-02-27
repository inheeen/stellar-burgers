import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { getUserThunk } from '../../services/slices/auth-slice';

import {
  AppHeader,
  Modal,
  ProtectedRoute,
  IngredientDetails,
  OrderInfo
} from '@components';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import IngredientPage from '../../pages/ingredient/ingredient';
import OrderPage from '../../pages/order/order';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUserThunk());
  }, [dispatch]);

  const isIngredientsLoading = useSelector((s) => s.ingredients.isLoading);
  const ingredients = useSelector((s) => s.ingredients.items);
  const error = useSelector((s) => s.ingredients.error);

  const location = useLocation();
  const navigate = useNavigate();
  const handleCloseModal = () => navigate(-1);

  const state = location.state as { background?: Location };
  const background = state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />

      {isIngredientsLoading ? (
        <div className='pt-10'>Загрузка...</div>
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length === 0 ? (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет ингредиентов
        </div>
      ) : (
        <>
          {/* Подложка */}
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />

            <Route path='/feed' element={<Feed />} />
            <Route path='/feed/:number' element={<OrderPage />} />

            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />

            <Route path='/ingredients/:id' element={<IngredientPage />} />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {/* Модалки */}
          {background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title='Детали заказа' onClose={handleCloseModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal title='Детали заказа' onClose={handleCloseModal}>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;