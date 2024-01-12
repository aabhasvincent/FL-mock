import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import { push } from 'connected-react-router';
import thunk from 'redux-thunk';

export const history = createBrowserHistory()

export const toggleLanguage = () => {
  return ({ type: 'TOGGLE_LANGUAGE' })};

export const goToRedPage = () => {
  return (dispatch) => {
    dispatch(push('/red'));
    dispatch({ type: 'GO_TO_RED_PAGE' });
  };
};

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      ),
    ),
  )

  return store
}