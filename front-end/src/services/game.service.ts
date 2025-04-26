import { Injectable } from "@angular/core";
import { MotService } from "src/services/mot.service";
import { PlayerService } from "./player.service";
import { PlatformService } from "./platform.service";
import { Platform } from "src/models/platform.model";
import { CoinCollectionService } from "./coincollection.service";
import { Coin } from "src/models/coin.model";

@Injectable({providedIn: 'root'})
export class GameService {
    constructor(private motService: MotService, private platformService : PlatformService
        ,private coinCollectionService : CoinCollectionService
    ){}

    private _w2g : string = this.motService.getWord();
    private _platforms : Platform[] = this.platformService.platforms;
    existentCoins : Coin[] = this.coinCollectionService.existentCoins;
    collectedCoins : Coin[] = this.coinCollectionService.collectedCoins;

    get w2g() : string{
        return this._w2g;
    }

    get platforms() :Platform[] {
        return this._platforms;
    }

    getExistentCoins() : Coin[]{
        return this.existentCoins;
    }

    getCollectedCoins() : Coin[]{
        return this.collectedCoins;
    }
}