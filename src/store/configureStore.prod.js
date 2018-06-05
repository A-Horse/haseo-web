import { createStore } from 'redux';

export default function configureStore(rootReducer, middle) {
  const store = createStore(rootReducer, middle);

  return store;
}
