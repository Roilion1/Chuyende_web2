import "./assets/sass/app.scss"
import Header from './layouts/Header';
import Nav from './layouts/Nav';
import NewsLetter from './layouts/NewsLetter';
import Footer from './layouts/Footer';
import Reducer from './store/Reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Outlet } from "react-router-dom";

const store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {

  return (
    <div>
      <Provider store={store}>
        <Header />
        <Nav />
        {/* <Main /> */}
        <Outlet />
        <NewsLetter />
        <Footer />
      </Provider>

    </div >
  );
}

export default App;