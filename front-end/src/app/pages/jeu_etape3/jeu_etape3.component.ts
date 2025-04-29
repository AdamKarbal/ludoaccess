import { Component,OnInit,HostListener } from "@angular/core";
import { KeyboardInputService } from "src/services/keyboard-input-w2g.service";

@Component({
  selector: "app-jeu_etape3",
    templateUrl: "./jeu_etape3.component.html",
    styleUrls: ["./jeu_etape3.component.scss"],
})
export class JeuEtape3Component implements OnInit{
  userInput: string = '';

  constructor(private keyboardInputService: KeyboardInputService) {}

  ngOnInit(): void {
    this.keyboardInputService.userInput$.subscribe(input => {
      this.userInput = input;
    });
  }
}