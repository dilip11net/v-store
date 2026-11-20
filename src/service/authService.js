
import api from './api'
let authStatus = null
const authService = {

  // LOGIN
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      const data = response.data.data

    //   // Validate API response
    //   if (!data.token) {
    //     throw new Error(
    //       data.message || 'Invalid email or password'
    //     )
    //   }
      if (!data) {
        throw new Error('Invalid email or password')
      }


    //   // Store authentication token
    //   localStorage.setItem('token', data.token)

    //   // Store user information
    //   const userData = {
    //     id: data.id,
    //     name: data.name,
    //     email: data.email,
    //     expiry: data.expiry
    //   }

    //   localStorage.setItem(
    //     'currentUser',
    //     JSON.stringify(userData)
    //   )
    // Store user information only (NOT JWT)
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        expiry: data.expiry
      }

      localStorage.setItem(
        'currentUser',
        JSON.stringify(userData)
      )

      localStorage.setItem('isLoggedIn', 'true')

      return data

    } catch (error) {
      console.error('Login failed:', error)

      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.'
      )
    }
  },

  // LOGOUT
//   logout() {
//     localStorage.removeItem('token')
//     localStorage.removeItem('currentUser')
//     localStorage.removeItem('isLoggedIn')
//   },
    async logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      authStatus = false
      localStorage.removeItem('currentUser')
    }
  },

//   // GET TOKEN
//   getToken() {
//     return localStorage.getItem('token')
//   },

  // GET USER
 getUser() {
    try {
      const user = localStorage.getItem('currentUser')
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  },

  // CHECK LOGIN STATUS
//   isLoggedIn() {
//     return !!this.getToken() && !!this.getUser()
//   },
async isLoggedIn() {
  if (authStatus !== null) {
            return authStatus
        }
  try {
    const response = await api.get('/auth/me')
    authStatus = true
    return authStatus
  } catch (error) {
    authStatus = false
    console.error(
      'Authentication check failed:',
      error.response?.status,
      error.response?.data || error.message
    )

    authStatus = false
    return authStatus
  }
},

  // CHECK TOKEN EXPIRY
 isTokenExpired() {
    const user = this.getUser()

    if (!user?.expiry) return true

    return new Date(user.expiry).getTime() <= Date.now()
  },
  // GET CURRENT USER FROM BACKEND
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me')

      const userData = response.data

      localStorage.setItem(
        'currentUser',
        JSON.stringify(userData)
      )

      return userData

    } catch (error) {
      localStorage.removeItem('currentUser')
      return null
    }
  },

  // REGISTER
  async register(name, email, password, confirmPassword) {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword
      })

      return response.data

    } catch (error) {
      console.error('Registration failed:', error)

      const errors = error.response?.data?.errors

      if (errors) {
        const firstError = Object.values(errors)[0]

        throw new Error(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError
        )
      }

      throw new Error(
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      )
    }
  },
  resetAuth() {
        authStatus = null
    }

}

export default authService
