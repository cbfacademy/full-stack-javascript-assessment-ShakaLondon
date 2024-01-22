import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    menuOpen: false,
    profileOpen: false,
    loading: false,
    error: false,
  }
  
  export const appStateSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      menuOpen: ( state, action ) => {
        state.menuOpen = !state.menuOpen
      },
      profileOpen: ( state, action ) => {
        state.profileOpen = action.payload
      },
      loading: ( state ) => {
        state.loading = !state.loading
      },
      error: ( state ) => {
        state.error = !state.error
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