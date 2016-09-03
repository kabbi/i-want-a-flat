export const ModulePath = 'workers';

export default {
  getState({ workers }) {
    return workers;
  },
  getAllTasks(state) {
    const { data, ids } = this.getState(state);
    return ids.map(id => data[id]);
  },
};
