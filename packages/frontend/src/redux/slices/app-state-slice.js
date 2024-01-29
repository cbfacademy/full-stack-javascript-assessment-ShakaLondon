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
        state.menuOpen = action.payload
      },
      profileOpen: ( state, action ) => {
        state.profileOpen = action.payload
      },
      loading: ( state, action ) => {
        state.loading = action.payload
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


export const { menuOpen, profileOpen, loading, error } = appStateSlice.actions 

export const getMenuState = (state) => state.appState.menuOpen
export const getProfileState = (state) => state.appState.profileOpen

export default appStateSlice.reducer