import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  type TRegisterData,
  type TLoginData
} from '../../utils/burger-api';
import { setCookie, getCookie } from '../../utils/cookie';
import type { TUser } from '../../utils/types';

type AuthState = {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuth: Boolean(getCookie('accessToken')),
  isLoading: false,
  error: null
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    return res;
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    return res;
  }
);

export const getUserThunk = createAsyncThunk('auth/getUser', async () => {
  const res = await getUserApi(); // { success, user }
  if (!res.success) return Promise.reject(res);
  return res.user;
});

export const updateUserThunk = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    if (!res.success) return Promise.reject(res);
    return res.user;
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '', { expires: -1 } as any);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(registerThunk.fulfilled, (s, a: any) => {
        s.isLoading = false;
        s.user = a.payload.user;
        s.isAuth = true;

        localStorage.setItem('refreshToken', a.payload.refreshToken);
        setCookie('accessToken', a.payload.accessToken);
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message ?? 'Ошибка регистрации';
      })

      // login
      .addCase(loginThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(loginThunk.fulfilled, (s, a: any) => {
        s.isLoading = false;
        s.user = a.payload.user;
        s.isAuth = true;

        localStorage.setItem('refreshToken', a.payload.refreshToken);
        setCookie('accessToken', a.payload.accessToken);
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message ?? 'Ошибка входа';
      })

      // getUser (автологин)
      .addCase(getUserThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(getUserThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuth = true;
      })
      .addCase(getUserThunk.rejected, (s) => {
        s.isLoading = false;
        s.user = null;
        s.isAuth = false;
      })

      // update user
      .addCase(updateUserThunk.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuth = true;
      })
      .addCase(updateUserThunk.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message ?? 'Ошибка обновления профиля';
      })

      // logout
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null;
        s.isAuth = false;
      });
  }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
