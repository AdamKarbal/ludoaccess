import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, combineLatest } from "rxjs";
import { FreezeGameService } from "./freeze-game.services";
import { Word2GuessService } from "./word2guess.services";  
import { SettingsService } from "./setting.service";
import { ChildSettings } from '../models/setting.model';

@Injectable({
    providedIn: "root",
})
export class ChronoService {
    private interval: any = null;
    private isRunning: boolean = false;
    public settings: ChildSettings | null = null;
    private time: number = this.settings?.displaymotsec || 10; // Temps par défaut de 10 secondes
    private chronoSubject = new BehaviorSubject(this.time);
    time$ = this.chronoSubject.asObservable();


    constructor(private freezeGameService: FreezeGameService, private word2GuessService: Word2GuessService, private settingsService: SettingsService) { 
        this.word2GuessService.isWordComplete$.subscribe(isCompleted => {
            if (isCompleted) {
                this.stopTimer();
                console.log("Timer stopped because the word is complete.");
            } else {
                this.startTimer();
            }
        });  
        this.settingsService.settings$.subscribe(settings => {
        this.settings = settings;
      });
        this.freezeGameService.isPaused$.subscribe(paused => {
            if (paused) this.stopTimer();
        });
        this.freezeGameService.isCrossed$.subscribe(exited => { 
            if (exited) this.stopTimer();
        });
        this.freezeGameService.isInfo$.subscribe(info => {
            if (info) this.stopTimer();
        });
        this.time=this.settings?.displaymotsec || 10;
    }

 

    public startTimer() {
        if(this.settings?.showTimer === false) {
            console.log('Timer is disabled in settings.');
            return;}
        if (!this.isRunning) {
            this.isRunning = true;
            // Créer l'intervalle et l'assigner à this.interval
            this.interval = setInterval(() => {
                // Vérifie les conditions d'arrêt et arrête le timer si nécessaire
                this.freezeGameService.isPaused$.subscribe(paused => {
                    if (paused) return this.stopTimer();
                    else return this.startTimer();  // Redémarre le timer si pas en pause
                });

                this.freezeGameService.isCrossed$.subscribe(exited => { 
                    if (exited) return this.stopTimer();
                    else return this.startTimer();
                });

                this.freezeGameService.isInfo$.subscribe(info => {
                    if (info) return this.stopTimer();
                    else return this.startTimer();
                });

                // Vérifie si le mot est complet
                if (this.word2GuessService.isWordComplete()) {
                    console.log("Timer stopped because the word is complete.");
                    this.stopTimer();  // Arrête le timer si le mot est complet
                } else {
                    this.time--;  // diminue le temps de 1 seconde
                    if (this.time <= 0) {
                        this.stopTimer();  // Arrête le timer si le temps est écoulé
                        this.time = 0;  // Réinitialise le temps à 0
                    }
                    this.chronoSubject.next(this.time);  // Mets à jour l'observable avec le temps
                }
            }, 1000);  // L'intervalle est de 1 seconde
        }
    }
    private stopTimer() {
        if (this.isRunning && this.interval) {
            clearInterval(this.interval);  // Arrête l'intervalle
            this.interval = null;  // Réinitialise l'intervalle
            this.isRunning = false;
        }
    }
    public resetTimer() {
        this.time = this.settings?.displaymotsec || 10;  // Réinitialise le temps à la valeur par défaut
        this.chronoSubject.next(this.time);
    }
    public getTime(): number {
        return this.time;
    }
}
