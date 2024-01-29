import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import gameData from '../../services/games/shape-snap'
import { loading } from './app-state-slice'
import { setUserGameRecords } from './user-state-slice'

const initialState = {
    game: {},
    gameAssets: [],
    complete: false,  
    score: 0,
  }

  export const getCurrentGame = createAsyncThunk(
    'currentGame/get',
    async ( payload, thunkAPI ) => {
      console.log(payload)
      thunkAPI.dispatch( loading(true) )
      const currentGame = await gameData.getCurrentGame( payload )
      console.log(currentGame)
      const user = thunkAPI.getState().userState.user
      console.log(user)
      const userContainsGame = user.gameRecords.find(game => game._id === currentGame._id)
      if ( !userContainsGame ) { 
        thunkAPI.dispatch( setUserGameRecords( currentGame ) )
      }
      console.log(userContainsGame, currentGame)
      const response = userContainsGame ?
      userContainsGame : currentGame
      console.log(response)

      thunkAPI.dispatch( setUserGameRecords( response ) )
      // thunkAPI.dispatch( loading(false) )
      return response
    } 
  )

  export const getGameScore = createAsyncThunk(
    'shapes/score',
    async ( payload, thunkAPI ) => {
      const response = await gameData.getGameScore(payload.gameName)
        return response 
    } 
  )

  export const submitScore = createAsyncThunk(
    'shapes/submitScore',
    async ( payload, thunkAPI ) => {
      const response = await gameData.submitScore(payload.email, payload.password)
        return response 
    } 
  )
  
  export const gameSlice = createSlice({
    name: 'current-game',
    initialState,
    reducers: {
      gameAssets: ( state, action ) => {
        state.gameAssets = action.payload
      },
      complete: ( state, action ) => {
        state.complete = action.payload
      },
      score: ( state, action ) => {
        state.score = action.payload
      },
      updateGameRecords : ( state, action ) => {
        console.log(action.payload)
        const existingRecordIndex = state.gameAssets.findIndex(game => game.dragSourcePath._id === action.payload.itemID)
        console.log(state.gameAssets[existingRecordIndex])
        state.gameAssets[existingRecordIndex] = { ...state.gameAssets[existingRecordIndex], dragSourcePath: { ...state.gameAssets[existingRecordIndex].dragSourcePath, dragLocation: { left: action.payload.left, top: action.payload.top } }};
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getCurrentGame.fulfilled, (state, action) => {
        state.game = action.payload 
        state.gameAssets = action.payload.gameAssets
        // state.user = { ...state.user, gameRecords: [...state.user.gameRecords, action.payload]}
      })
    .addCase(getGameScore.fulfilled, (state, action) => {
          state.user = action.payload.user
          state.accessToken = action.payload.accessToken
          state.refreshToken = action.payload.refreshToken
          state.verified = true
          state.loggedIn = true
        })
        .addCase(submitScore.fulfilled, (state, action) => {
          if ( action.payload === false ) {
            state.user = null
            state.token = null
            state.verified = false
          } 
        })
    },
  })

export const { gameAssets, complete, score, updateGameRecords } = gameSlice.actions 

export default gameSlice.reducer