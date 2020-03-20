export default function({ store, next }) {

  if(!store.state.auth.isLoggedIn) {
    return next({
      name: 'login'
    })
  }
  
  next()
}
