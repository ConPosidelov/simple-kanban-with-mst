import {observable} from 'mobx';


const defultTask = {
  title:'New Task',
  color:'Yellow',
  priority: 0
};

const model = observable.box(defultTask);
export const newTaskModel = model.get();
export const setDefaultTask = () => model.set(defultTask);