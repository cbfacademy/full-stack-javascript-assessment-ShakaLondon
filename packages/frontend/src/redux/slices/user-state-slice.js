import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import userAuth from '../../services/user/user-auth'
import tokenService from '../../services/axios/token-service'
import { navigateTo } from '../../hooks/location-path-hooks'
import { getCurrentGame } from './game-status-slice'
import userData from '../../services/user/user-data'

const initialState = {
    user: {
      name: "",
      surname: "",
      childsName: "",
      childDateOfBirth: "",
      username: "",
      password: "",
      dateOfBirth: "",
      email: "",
      avatar: {},
      gameRecords: [],
    },
    loggedIn: false,
    accessToken: "",
    refreshToken: "",
  }

  export const userLogin = createAsyncThunk(
    'users/login',
    async ( payload, thunkAPI ) => {
      const response = await userAuth.login(payload.email, payload.password)
        return response 
    } 
  )

 export const userRegister = createAsyncThunk(
    'users/register',
    async ( payload, thunkAPI) => {
      const response = await userAuth.register(payload)
      return response
    }
  )

  export const userUpdate = createAsyncThunk(
    'users/userUpdate',
    async ( payload, thunkAPI) => {
      const response = await userData.editUser(payload)
      return response.data
    }
  )

  export const userUpdateImage = createAsyncThunk(
    'users/userUpdateImage',
    async ( payload, thunkAPI) => {
      const response = await userData.editAvatar(payload)
      console.log(response, 'late')
      return response.data
    }
  )

export const checkCredentials = createAsyncThunk(
    'users/checkCredentials',
    async ( payload, thunkAPI) => {
      const state = thunkAPI.getState()
      const { appState } = state
      if ( appState.token !== null ) {
        const response = await tokenService.checkCredentials()
        return response

      }
    }
  )
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout: state => {
        userAuth.logout()
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.loggedIn = false
      },
      refreshToken: ( state, action ) => {
        state.accessToken = action.payload
      },
      setUserGameRecords: ( state, action ) => {
        state.user.gameRecords = state.user.gameRecords.splice(1, 0, action.payload);
      },
      updateUserGameRecords : ( state, action ) => {
        const existingRecordIndex = state.user.gameRecords.findIndex(game => game._id === action.payload.gameID)
        state.user.gameRecords = state.user.gameRecords.splice(existingRecordIndex, 1, { ...state.user.gameRecords[existingRecordIndex], gameAssets: action.payload });
      }
    },
    extraReducers: (builder) => {
      builder.addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.verified = true
        state.loggedIn = true
      })
    .addCase(userRegister.fulfilled, (state, action) => {
          state.user = action.payload.user
          state.accessToken = action.payload.accessToken
          state.refreshToken = action.payload.refreshToken
          state.verified = true
          state.loggedIn = true
        })
        .addCase(checkCredentials.fulfilled, (state, action) => {
          if ( action.payload === false ) {
            state.user = null
            state.token = null
            state.verified = false
          } 
        })
        .addCase(userUpdate.fulfilled, (state, action) => {
          if ( action.payload.user !== false ) {
            state.user = action.payload.user
          }
        })
        .addCase(userUpdateImage.fulfilled, (state, action) => {
          if ( action.payload.user !== false ) {
            state.user = action.payload.user
          }
        })
    },
  })

export const { logout, refreshToken, setUserGameRecords, updateUserGameRecords } = userSlice.actions 

// export const getMenuState = (state) => state.appState.menuOpen
// export const getProfileState = (state) => state.appState.profileOpen

export default userSlice.reducer