import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  setAuthChecked,
  updateUser,
  userReducer
} from './user-slice';
import { TUser } from '../../utils/types';

const userMock: TUser = {
  email: 'test@test.ru',
  name: 'Маша'
};

describe('user reducer', () => {
  it('должен устанавливать isAuthChecked через setAuthChecked', () => {
    const state = userReducer(undefined, setAuthChecked(true));

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обрабатывать registerUser.pending', () => {
    const state = userReducer(undefined, registerUser.pending('', {} as any));

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      isLoading: true,
      error: null
    });
  });

  it('должен обрабатывать registerUser.fulfilled', () => {
    const state = userReducer(
      {
        user: null,
        isAuthChecked: false,
        isLoading: true,
        error: null
      },
      registerUser.fulfilled(userMock, '', {} as any)
    );

    expect(state).toEqual({
      user: userMock,
      isAuthChecked: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обрабатывать registerUser.rejected', () => {
    const action = registerUser.rejected(
      new Error('Ошибка регистрации'),
      '',
      {} as any
    );

    const state = userReducer(
      {
        user: null,
        isAuthChecked: false,
        isLoading: true,
        error: null
      },
      action
    );

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      isLoading: false,
      error: 'Ошибка регистрации'
    });
  });

  it('должен обрабатывать loginUser.fulfilled', () => {
    const state = userReducer(
      {
        user: null,
        isAuthChecked: false,
        isLoading: true,
        error: null
      },
      loginUser.fulfilled(userMock, '', {} as any)
    );

    expect(state).toEqual({
      user: userMock,
      isAuthChecked: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обрабатывать fetchUser.fulfilled', () => {
    const state = userReducer(
      {
        user: null,
        isAuthChecked: false,
        isLoading: true,
        error: null
      },
      fetchUser.fulfilled(userMock, '', undefined)
    );

    expect(state).toEqual({
      user: userMock,
      isAuthChecked: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обрабатывать fetchUser.rejected', () => {
    const action = fetchUser.rejected(
      new Error('Ошибка пользователя'),
      '',
      undefined
    );

    const state = userReducer(
      {
        user: userMock,
        isAuthChecked: false,
        isLoading: true,
        error: null
      },
      action
    );

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      isLoading: false,
      error: 'Ошибка пользователя'
    });
  });

  it('должен обрабатывать updateUser.fulfilled', () => {
    const updatedUser: TUser = {
      email: 'new@test.ru',
      name: 'Новая Маша'
    };

    const state = userReducer(
      {
        user: userMock,
        isAuthChecked: true,
        isLoading: true,
        error: null
      },
      updateUser.fulfilled(updatedUser, '', {} as any)
    );

    expect(state).toEqual({
      user: updatedUser,
      isAuthChecked: true,
      isLoading: false,
      error: null
    });
  });

  it('должен обрабатывать logoutUser.fulfilled', () => {
    const state = userReducer(
      {
        user: userMock,
        isAuthChecked: true,
        isLoading: true,
        error: null
      },
      logoutUser.fulfilled(undefined, '', undefined)
    );

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      isLoading: false,
      error: null
    });
  });
});
