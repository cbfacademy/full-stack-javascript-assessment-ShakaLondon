import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import userAuth from '../../services/user/user-auth'
import tokenService from '../../services/axios/token-service'
import { navigateTo } from '../../hooks/location-path-hooks'

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
        state.token = null
        state.verified = false
        state.loggedIn = false
      },
    },
    extraReducers: (builder) => {
      builder.addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
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
    },
  })

export const { logout } = userSlice.actions 

// export const getMenuState = (state) => state.appState.menuOpen
// export const getProfileState = (state) => state.appState.profileOpen

export default userSlice.reducer