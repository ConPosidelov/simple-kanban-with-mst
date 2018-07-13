// Columns
import { types } from "mobx-state-tree";
import Task from '../Task';

export default types
  .model("ColumnModel", {
    id: types.optional(types.number, () => Math.random()),
    title: types.string,
    tasks: types.optional(types.array(Task), [])
  })
  .views(self => ({
    get sortedByPriority() {
      return self.tasks.slice().sort((a, b) => a.priority - b.priority)
    }
  })) 
  .actions(self => ({
    addTask(task) {
      self.tasks.push(task)
    }
  }));  