export default function({ store, next, router }) {
  if (!store.state.auth.isLoggedIn) {
    return next({
      name: "login"
    });
  }

  next();
}
