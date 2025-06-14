import {Interaction} from "./interaction.model";

export class InteractionImpl implements Interaction {
  action:string;
  success:number;
  failures:number;
  date:Date;
  constructor(action:string, success:number, failure:number) {
    this.action = action;
    this.success = success;
    this.failures=failure;
    this.date = new Date();
  }
  addSuccess(number:number){
    this.success += number;
  }
  addFailure(number:number){
    this.failures += number;
  }
  getAction():string{
    return this.action;
  }

}
