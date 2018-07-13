import { types, getRoot } from "mobx-state-tree";


const Task = types
  .model("TaskModel", {
    id: types.optional(types.number, () => Math.random()),
    title: types.optional(types.string, 'New task'),
    color: types.optional(types.string, 'Yellow'),
    status: types.optional(types.string, 'none'),
    priority: types.optional(types.number, 0)

  })
  .actions(self => ({
    editTask(task) {
      Object.keys(task).forEach(key => {
        self[key] = task[key]
      });
    },
    deleteTask() {
      getRoot(self).deleteTask(self)
    },
    moveTask() {
      
    }
  }));

export default Task;