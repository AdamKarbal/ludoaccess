import { Injectable } from "@angular/core";
import { MotService } from "src/services/mot.service";

@Injectable({providedIn: 'root'})
export class GameService {
    constructor(private motService: MotService){}

    private _w2g : string = this.motService.getWord();

    get w2g() : string{
        return this._w2g;
    }

}