export default{
  v2 (state) {
    return localStorage.getItem('v2')
  },
  isAuth (state) {
    return state.token !== '' && state.auth
  }
}
