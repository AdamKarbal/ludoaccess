import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardInputService implements OnDestroy {
  private userInputSubject = new BehaviorSubject<string>('');
  public userInput$ = this.userInputSubject.asObservable();

  private keydownSubscription: Subscription;

  constructor() {
    // Écoute des événements clavier
    this.keydownSubscription = fromEvent<KeyboardEvent>(document, 'keydown')
      .subscribe(event => this.handleKeyDown(event));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key.length === 1 && /^\p{L}$/u.test(key)) {  // Vérifie que c'est une lettre
      this.userInputSubject.next(key);
      setTimeout(() => {
        this.userInputSubject.next('');
      }, 10);
    }
  }

  ngOnDestroy(): void {
    if (this.keydownSubscription) {
      this.keydownSubscription.unsubscribe();
    }
  }
}
