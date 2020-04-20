/* eslint-disable class-methods-use-this */
class StateLoader {
  loadState() {
    try {
      const serializedState = localStorage.getItem('http://eclasse.io:state');

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('http://eclasse.io:state', serializedState);
    } catch (err) {
      console.log(err);
    }
  }

  initializeState(form) {
    const formData = new FormData(form);
    return formData;
  }
}

export default StateLoader;
