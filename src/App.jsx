import LoadingPages from "./components/LoadingPages";
import UseAuth from "./hooks/UseAuth";
import AppRoute from "./routers/AppRoute"

function App() {
  const { loading } = UseAuth();

  if(loading){
    return <LoadingPages />
  }

  return (
    <>
      <AppRoute />
    </>
  )
}

export default App;
