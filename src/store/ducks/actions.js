class StateLoader {
  constructor() {
    this.state = '';
    this.form = '';
  }

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
    this.state = state;
    try {
      const serializedState = JSON.stringify(this.state);
      localStorage.setItem('http://eclasse.io:state', serializedState);
    } catch (err) {
      console.log(err);
    }
  }

  initializeState(form) {
    this.form = form;
    const formData = new FormData(this.form);
    return formData;
  }
}

export default StateLoader;
