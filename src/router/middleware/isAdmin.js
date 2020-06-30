export default function({ store, next }) {
  if (!store.state.auth.user.type === "admin") {
    console.log("not admin");
    return router.back();
  }

  next();
}
