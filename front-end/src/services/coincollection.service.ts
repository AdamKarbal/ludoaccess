import { Coin } from "src/models/coin.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { LevelService } from "./levels.service";

@Injectable({ providedIn: 'root' })
export class CoinCollectionService {
    private _existentCoins: Coin[] = [];
    private _collectedCoins: Coin[] = [];
    private existentCoinsSubject = new BehaviorSubject<Coin[]>([]);
    private collectedCoinsSubject = new BehaviorSubject<Coin[]>([]);

    private collectedCoinSubject = new Subject<Coin>(); 

    collectedCoin$ = this.collectedCoinSubject.asObservable();
    existentCoins$ = this.existentCoinsSubject.asObservable();
    collectedCoins$ = this.collectedCoinsSubject.asObservable();

    constructor(private levelService: LevelService) {}

    addCollected(coin: Coin): void {
        this._collectedCoins.push(coin);
        this.collectedCoinsSubject.next([...this._collectedCoins]);
        this.collectedCoinSubject.next(coin); 
        this.levelService.increaseProgress(5);
    }

    addExistent(coin: Coin): void {
        this._existentCoins.push(coin);
        this.existentCoinsSubject.next([...this._existentCoins]);
    }

    get existentCoins(): Coin[] {
        return this._existentCoins;
    }

    get collectedCoins(): Coin[] {
        return this._collectedCoins;
    }

    reset(): void {
        console.log("le reset est appeler");
        this._collectedCoins = [];
        this._existentCoins = [];
        this.collectedCoinsSubject.next([]);
        this.existentCoinsSubject.next([]);
    }
}
