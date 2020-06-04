import {observable,action} from 'mobx';
class Store {

  @observable count=0;

  @action.bound increment(){

    this.count++;
  }



}

export default new Store();