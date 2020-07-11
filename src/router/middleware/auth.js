export default function({ store, next, router }) {
  console.log({ hhh: !store.state.auth.isLoggedIn });
  console.log({ auth: !!store.state.auth.isLoggedIn });
  if (!store.state.auth.isLoggedIn) {
    console.log("jjj");
    return next({
      name: "login"
    });
  }

  next();
}
