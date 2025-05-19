import { Coin } from "src/models/coin.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LevelService } from "./levels.service";

@Injectable({ providedIn: 'root' })
export class CoinCollectionService {
    private _existentCoins: Coin[] = [];
    private _collectedCoins: Coin[] = [];

    private collectedCoinSubject = new Subject<Coin>(); 

    collectedCoin$ = this.collectedCoinSubject.asObservable();

    constructor(private levelService: LevelService) {}

    addCollected(coin: Coin): void {
        this._collectedCoins.push(coin);
        this.collectedCoinSubject.next(coin); 
        this.levelService.increaseProgress(20);
    }

    addExistent(coin: Coin): void {
        this._existentCoins.push(coin);
    }

    get existentCoins(): Coin[] {
        return this._existentCoins;
    }

    get collectedCoins(): Coin[] {
        return this._collectedCoins;
    }

    reset(): void {
        this._collectedCoins = [];
        this._existentCoins = [];
    }
    
}
