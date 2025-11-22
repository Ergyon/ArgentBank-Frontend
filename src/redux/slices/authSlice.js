import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok || data.status !== 200) {
        return rejectWithValue(data.message || 'Invalid email or password')
      }

      // stocker token dans le storage
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('token', data.body.token)
      storage.setItem('rememberMe', rememberMe)

      return {
        token: data.body.token,
        rememberMe,
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

// verifier au chargement si user est connecte
const getInitialState = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const rememberMe = localStorage.getItem('rememberMe') === 'true'

  return {
    token: token || null,
    isAuthenticated: !!token,
    rememberMe: rememberMe,
    loading: false,
    error: null,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),

  reducers: {
    // deconnexion
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.rememberMe = false
      state.error = null

      localStorage.removeItem('token')
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('userData')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('rememberMe')
      sessionStorage.removeItem('userData')
    },

    clearError: (state) => {
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      // chargement
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // reussie
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.isAuthenticated = true
        state.rememberMe = action.payload.rememberMe
        state.error = null
      })
      // echouee
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.token = null
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
