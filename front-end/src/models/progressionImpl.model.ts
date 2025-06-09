import {Progression} from "./progression.model";

export class ProgressionImpl implements Progression{
  public word:string;
  public completed:boolean;
  public nbError:number;
  public timeSpent:number;
  constructor(word:string,nbError:number) {
    this.word = word;
    this.completed = false;
    this.nbError = nbError;
    this.timeSpent = 0;
  }

  addError(error:number) {
    this.nbError+=error;
  }

  setTime(time:number){
    this.timeSpent = time;
  }

  setCompleted(completed:boolean) {
    this.completed = completed;
  }



}
