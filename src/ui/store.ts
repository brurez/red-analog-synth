import { observable } from "mobx";

class Store implements IStore {
  @observable public octave: number = 3;
}

const store = new Store();

export default store;
