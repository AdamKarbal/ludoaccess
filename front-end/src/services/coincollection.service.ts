import { Coin } from "src/models/coin.model";
import { Word2GuessComponent } from "src/app/components/word2guess/word2guess.component";
import { Injectable } from "@angular/core";

@Injectable({providedIn : 'root'})
export class CoinCollectionService{
    private _existentCoins : Coin[] = [];
    private _collectedCoins : Coin[] = [];

    constructor(){}

    addCollected(coin : Coin) : void{
        this._collectedCoins.push(coin);
    }

    addExistent(coin : Coin) : void{
        this._existentCoins.push(coin);
    }

    get existentCoins() : Coin[]{
        return this._existentCoins;
    }

    get collectedCoins() : Coin[]{
        return this._collectedCoins;
    }
}