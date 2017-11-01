import Inferno from 'inferno';
import reducer from './reducer';
import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';
import createHistory from 'history/createHashHistory';
import App from './components/App.jsx';
import Contacts from './components/Contacts.jsx';
import Contact from './components/Contact.jsx';
import { locationChange } from './actions';
import { Router, Route } from 'inferno-router';
import { Provider } from 'inferno-redux';

const initialState = {
  contacts: null,
  fetching: false,
  location: null,
};

// store
const history = createHistory();
const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware(reducer, initialState);
const dispatchLocationChange = (location) => store.dispatch(locationChange(location));
// initialise the history
dispatchLocationChange(history.location);
history.listen(dispatchLocationChange);

// listen to history changes so we can update the listen and update the nav ui states when the route changes
history.listen((location) => store.dispatch(locationChange(location)));

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="*" component={Contacts} />
        <Route path="/contact" component={Contacts} />
        <Route path="/contact/:id" component={Contact} />
      </Route>
    </Router>
  </Provider>
)

Inferno.render(routes, document.getElementById('app'));