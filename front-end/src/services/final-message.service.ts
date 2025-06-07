import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
    providedIn: 'root'
})
export class FinalMessageService {

     private wantToContinue = new BehaviorSubject<boolean>(false);
     public wantToContinue$ = this.wantToContinue.asObservable();

     private wantToExit = new BehaviorSubject<boolean>(false);
     public wantToExit$ = this.wantToExit.asObservable();

    
    constructor() {}
    
    setWantToContinue():void{
        this.wantToContinue.next(true);
        this.reset();
    }

    setWantToExit():void{
        this.wantToExit.next(true);
        this.reset();
    }
    getWantToContinue():boolean{
        console.log("getWantToContinue", this.wantToContinue);
        return this.wantToContinue.getValue();
    }
    
    reset() {
        this.wantToContinue.next(false);
        this.wantToExit.next(false);
      }
      
    }