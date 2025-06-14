import {Progression} from "./progression.model";

export class ProgressionImpl implements Progression{
  public word:string;
  public completed:boolean;
  public nbError:number;
  public timeSpent:number;
  public date:Date;
  constructor(word:string,nbError:number) {
    this.word = word;
    this.completed = false;
    this.nbError = nbError;
    this.timeSpent = 0;
    this.date = new Date();
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
