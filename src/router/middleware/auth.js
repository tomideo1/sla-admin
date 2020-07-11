export default function({ store, next, router }) {
  console.log({ hhh: store.state.isLoggedIn });
  if (!store.state.auth.isLoggedIn) {
    return next({
      name: "login"
    });
  }

  next();
}
