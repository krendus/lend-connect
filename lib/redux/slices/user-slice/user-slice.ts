/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
})
export const { setUser } = userSlice.actions;
