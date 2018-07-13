import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {onAction} from 'mobx-state-tree';
import {observable} from 'mobx';
import {Provider} from 'mobx-react';

import {devToolsForPoorMans} from './utils/devTools';
import Table from './models/Table';
import {initialState} from './models/common/initial';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';



const tableStore = Table.create(initialState);
const store = {
  tableStore: tableStore,
  history: {
    snapshots: observable.array([], { deep: false }),
    actions: observable.array([], { deep: false }),
    patches: observable.array([], { deep: false }),
    counterUndoRedo: observable.box(0),
    isUndoRedo: observable.box(false)
  }
};

const WithProvider = (
  <Provider {...store}>
    <App />
  </Provider>
);

ReactDOM.render(WithProvider, document.getElementById('root'));



// Undo - Redo branch logic

onAction(tableStore, (action) => {
  const { counterUndoRedo, isUndoRedo, snapshots } = store.history;
  const {name} = action;
  const counter = counterUndoRedo.get();
  if(name === '@APPLY_SNAPSHOT'){ 
    isUndoRedo.set(true);
  } else {
    isUndoRedo.set(false);
  }
  if(counter && !isUndoRedo.get()) {
    snapshots.splice(0, counter);
    counterUndoRedo.set(0)
  }
});

devToolsForPoorMans(store.history, tableStore);

registerServiceWorker();


