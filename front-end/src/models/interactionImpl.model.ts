import {Interaction} from "./interaction.model";

export class InteractionImpl implements Interaction {
  action:string;
  success:number;
  failures:number;
  constructor(action:string, success:number, failure:number) {
    this.action = action;
    this.success = success;
    this.failures=failure;
  }
  addSuccess(number:number){
    this.success += number;
  }
  addFailure(number:number){
    this.failures += number;
  }
}
