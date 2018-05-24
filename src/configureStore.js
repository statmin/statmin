/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import { fromJS } from "immutable"
import createReducer from "./reducers"

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}) {
  const middlewares = [sagaMiddleware]
  const enhancers = [applyMiddleware(...middlewares)]

  // Setup Redux DevTools
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  )

  // Extensions
  // TODO: uncomment when needed
  //   store.runSaga = sagaMiddleware.run
  //   store.injectedReducers = {} // Reducer registry
  //   store.injectedSagas = {} // Saga registry

  // TODO: If reducer not hot reload, un-comment below
  //   if (module.hot) {
  //     module.hot.accept("./reducers", () => {
  //       store.replaceReducer(createReducer(store.injectedReducers))
  //     })
  //   }

  return store
}
