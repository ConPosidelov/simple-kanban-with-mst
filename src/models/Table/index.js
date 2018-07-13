import { types, destroy } from "mobx-state-tree";
import Column from '../Column';

const Table = types
  .model("TableModel", {
    id: types.optional(types.number, () => Math.random()),
    columns: types.optional(types.array(Column), []),
    editTaskMode: types.optional(types.string, 'none'),
    isDevToolsVisible: types.optional(types.boolean, false)
  })
  .actions(self => ({
    addColumn(title) {
       self.columns.push({title});
    },
    removeColumn(column) {
      destroy(column)
    },
    toggleEditor(mode = 'none') {
      self.editTaskMode = mode
    },
    deleteTask(task) {
      destroy(task)
    },
    addTaskFromRoot(index, task) {
      self.columns[index].tasks.push(task);
    },
    toggleDevTools() {
      self.isDevToolsVisible = !self.isDevToolsVisible
    }
  }));

export default Table;