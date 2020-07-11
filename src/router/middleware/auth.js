export default function({ store, next, router }) {
  if (!store.state.auth.isLoggedIn) {
    router.replace({
      name: "login"
    });
  }

  next();
}
