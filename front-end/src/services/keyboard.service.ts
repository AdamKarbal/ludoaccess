import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keySubject=new BehaviorSubject<string|null>(null);
  key$ = this.keySubject.asObservable();

  constructor() {
    window.addEventListener('keydown', (event) => {
      this.keySubject.next(event.key);
      //console.log(this.keySubject.value);
    });

    window.addEventListener('keyup', () => {
      this.keySubject.next(null);
    });
  }
}
