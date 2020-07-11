export default function({ store, next, router }) {
  console.log({ hhh: store.state.auth.isLoggedIn });
  console.log({ auth: store.state.auth });
  if (!store.state.auth.isLoggedIn) {
    return next({
      name: "login"
    });
  }

  next();
}
