import { createSlice } from '@reduxjs/toolkit';
import { UserController } from './user.controller';
import { UserState } from './types';
import { User } from '@frontend/repositories';
import { clearCookie } from '@frontend/helpers/cookie';

const userController = UserController.getInstance();

const initialState: UserState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // GetCurrentUserAPI
    builder.addCase(userController.getCurrentUser.pending, state => {
      state.currentUser.isLoading = true;
    });
    builder.addCase(
      userController.getCurrentUser.fulfilled,
      (state, action): UserState => {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            isLoading: false,
            data: User.buildUser(action.payload),
          },
        };
      },
    );
    builder.addCase(
      userController.getCurrentUser.rejected,
      (state, action): UserState => {
        return {
          ...state,
          currentUser: {
            isLoading: false,
            error: action.payload,
          },
        };
      },
    );

    // GetUsersAPI
    builder.addCase(
      userController.getUsers.fulfilled,
      (state, action): UserState => {
        // const { currentPage, pageSize, totalCount } = metadata;

        return {
          ...state,
          users: action.payload.map((user: any): User => User.buildUser(user)),
          // currentPage,
          // pageSize,
          // totalUsers: totalCount,
        };
      },
    );
    builder.addCase(
      userController.getUsers.rejected,
      (state, action): UserState => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // UpdateUserAPI
    builder.addCase(
      userController.updateUser.fulfilled,
      (state, action): UserState => {
        console.log(action.payload)
        return {
          ...state,
        };
      },
    );
    builder.addCase(
      userController.updateUser.rejected,
      (state, action): UserState => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // UpdateUsernameAPI
    builder.addCase(
      userController.updateUsername.fulfilled,
      (state, action): UserState => {
        console.log(action.payload)
        clearCookie('Authentication');
        window.location.reload();

        return {
          ...state,
        };
      },
    );
    builder.addCase(
      userController.updateUsername.rejected,
      (state, action): UserState => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // UpdatePasswordAPI
    builder.addCase(
      userController.updatePassword.fulfilled,
      (state, action): UserState => {
        console.log(action.payload)
        clearCookie('Authentication');
        window.location.reload();

        return {
          ...state,
        };
      },
    );
    builder.addCase(
      userController.updatePassword.rejected,
      (state, action): UserState => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions;
export const { reducer: userReducer } = userSlice;
