import {
    onSnapshot,
    onAction,
    onPatch,
    applySnapshot,
    applyAction,
    applyPatch,
    getSnapshot
} from "mobx-state-tree";



export const devToolsForPoorMans = (store, target) => {

  let recording = true;

  onSnapshot(
    target,
    s =>
      recording &&
      store.snapshots.unshift({
        data: s,
        replay() {
          recording = false
          applySnapshot(target, this.data)
          recording = true
        }
      })
  )

  onPatch(
    target,
    s =>
      recording &&
      store.patches.unshift({
        data: s,
        replay() {
          recording = false
          applyPatch(target, this.data)
          recording = true
        }
      })
  )
  onAction(
    target,
    s =>
      recording &&
      store.actions.unshift({
        data: s,
        replay() {
          recording = false
          applyAction(target, this.data)
          recording = true
        }
      })
  )

  store.snapshots.push({
      data: getSnapshot(target),
      replay() {
          recording = false
          applySnapshot(target, this.data)
          recording = true
      }
  })

};
