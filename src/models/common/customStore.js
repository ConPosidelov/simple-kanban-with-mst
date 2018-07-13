// custom store

const store = {};
export const setModel = (model, val) => {
  store[model] = val;
};
export const getModel = (model) => {
  return store[model];
};
