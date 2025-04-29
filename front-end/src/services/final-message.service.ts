import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class FinalMessageService {
    private wantToContinue :boolean = false;

    
    constructor() {}
    
    setWantToContinue(boolean : boolean):void{
        console.log("setWantToContinue", boolean);
        this.wantToContinue = boolean;
    }
    getWantToContinue():boolean{
        console.log("getWantToContinue", this.wantToContinue);
        return this.wantToContinue;
    }
    }