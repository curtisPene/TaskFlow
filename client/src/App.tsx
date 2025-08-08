import { Provider } from "react-redux";
import { AppRouter } from "./app/app-router";
import { store } from "./app/app-provider";
function App() {
  return (
    <Provider store={store}>
      <AppRouter />;
    </Provider>
  );
}

export default App;
