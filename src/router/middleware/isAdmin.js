export default function({ store, next, router }) {
  if (store.state.auth.role === "coach") {
    router.go(-1);
  }

  next();
}
