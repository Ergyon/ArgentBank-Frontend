import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// recuperer profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (!response.ok || data.status !== 200) {
        return rejectWithValue(data.message || 'Failed to fetch profile')
      }

      // stocker les donnees dans le storage
      const rememberMe = localStorage.getItem('rememberMe') === 'true'
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('userData', JSON.stringify(data.body))

      return data.body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

// mettre a jour le profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        },
      )

      const data = await response.json()

      if (!response.ok || data.status !== 200) {
        return rejectWithValue(data.message || 'Failed to update profile')
      }

      // mettre a jour le storage
      const rememberMe = localStorage.getItem('rememberMe') === 'true'
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('userData', JSON.stringify(data.body))

      return data.body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

// etat initial : recuperer depuis le storage si existants
const getInitialState = () => {
  const storedUserData =
    localStorage.getItem('userData') || sessionStorage.getItem('userData')

  return {
    data: storedUserData ? JSON.parse(storedUserData) : null,
    loading: false,
    error: null,
  }
}

// slice User
const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),

  reducers: {
    // nettoyer si deconnexion
    clearUserData: (state) => {
      state.data = null
      state.error = null
    },

    clearUserError: (state) => {
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      // fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading.false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearUserData, clearUserError } = userSlice.actions
export default userSlice.reducer
