export default function({ store, error, redirect }) {
  console.log(store)
  if (!store.state.authUser) {
    return redirect('/login')
  }
}
