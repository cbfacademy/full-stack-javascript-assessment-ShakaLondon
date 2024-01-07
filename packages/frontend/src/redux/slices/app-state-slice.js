import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    menuOpen: false,
    profileOpen: false,
  }
  
  export const appStateSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      menuOpen: ( state, action ) => {
        state.menuOpen = action.payload
      },
      profileOpen: ( state, action ) => {
        state.profileOpen = action.payload
      },
    },
    // extraReducers: (builder) => {
    //   builder.addCase(userLogin.fulfilled, (state, action) => {
    //   })
    // },
  })

export const { menuOpen, profileOpen } = appStateSlice.actions 

export const getMenuState = (state) => state.appState.menuOpen
export const getProfileState = (state) => state.appState.profileOpen

export default appStateSlice.reducer