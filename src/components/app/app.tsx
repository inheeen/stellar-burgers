import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  IngredientPage,
  Login,
  NotFound404,
  OrderPage,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { background?: Location } | null;
  const background = state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const isIngredientsLoading = useSelector((s) => s.ingredients.isLoading);
  const ingredients = useSelector((s) => s.ingredients.items);
  const error = useSelector((s) => s.ingredients.error);

  const handleCloseModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      {isIngredientsLoading ? (
        <div className='text text_type_main-medium pt-4'>
          Загрузка ингредиентов...
        </div>
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
          {}
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

          {}
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
