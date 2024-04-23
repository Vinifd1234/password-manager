import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxIndexedDBService, NgxIndexedDBModule } from 'ngx-indexed-db';
import * as crypto from 'crypto-ts';
import { WordArray } from 'crypto-ts/src/lib/WordArray';



@Component({
  selector: 'app-signupscreen',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgFor, NgIf],
  templateUrl: './signupscreen.component.html',
  styleUrl: './signupscreen.component.css'
})

export class SignupscreenComponent {
  private password: string = "";
  private isStrong: Boolean = false;
  // password status might work as a point based system where 0 is weakest and 3 is strongest
  private statusPoints: number = 0;
  public status: string = "";
  // handle button status
  public isButtonEnabled: Boolean = false;
  // error messages
  public passwordLessThan14: Boolean = false;
  public passwordHasSequencialNumber: Boolean = false;
  public passwordHasLowerAndUpperCase: Boolean = false;
  public passwordDontMatch: Boolean = false;
  // handle "show" label
  public showLabelStatus: string = "Show";

  constructor (
    private dbService: NgxIndexedDBService, 
    private cookieService: CookieService,
    private router: Router) {}


    /*
  ngOnInit() {
     console.log(this.cookieService.getAll());

     let descriptografado: WordArray = crypto.AES.decrypt(this.cookieService.get("master"), 'test');
     var plaintext = descriptografado.toString(crypto.enc.Utf8);
     console.log(plaintext)
     
     
    

     if (crypto.AES.encrypt(this.cookieService.get("master"), 'test').toString() === crypto.AES.encrypt('321', 'test').toString()) {
      
     } else {
      
     }
  } */

  onPasswordChange(event: KeyboardEvent) {
   const input = event.target as HTMLInputElement;
   const inputValue: string = input.value;
   this.password = inputValue;
   this.checkPasswordStrength(inputValue);

  }

  confirmPasswordEquality(event: KeyboardEvent){
  const input = event.target as HTMLInputElement;
  const inputValue: string = input.value;

  if (inputValue === this.password) {
    this.isButtonEnabled = true;
    this.passwordDontMatch = false;
  } else {
    this.isButtonEnabled = false;
    this.passwordDontMatch = true;
  }

  

  }

  showPassword(passwordInput: HTMLInputElement, confirmPasswordInput: HTMLInputElement) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
      this.showLabelStatus = "Hide"
    } else {
      passwordInput.type = "password";
      confirmPasswordInput.type = "password";
      this.showLabelStatus = "Show"
    }
  }

  signUp() {
   this.cookieService.set("master", crypto.AES.encrypt(this.password, 'testkey').toString());
   alert("Master password has created with sucess");
   // make route changing
   this.router.navigate([''])

  }

  private checkPasswordStrength(password: string) {
     this.statusPoints = 0;
    if (password.length >= 14) {
        this.statusPoints++;
        this.passwordLessThan14 = false;
    } else {
      this.passwordLessThan14 = true;
    }

    if (this.hasUpperCase(password) && this.hasLowerCase(password)) {
      this.statusPoints++;
      this.passwordHasLowerAndUpperCase = false;
    } else {
      this.passwordHasLowerAndUpperCase = true;
    }

    if (!this.hasNumberSequence(password)) {
      this.statusPoints++;
      this.passwordHasSequencialNumber = false;
    } else {
      this.passwordHasSequencialNumber = true;
    }
   
    this.setStatusValue();

  }

  private setStatusValue() {
    switch (this.statusPoints) {
      case 0: {
        this.status = "Very weak";
        break;
      }
      case 1: {
        this.status = "Weak";
        break;
      }
      case 2: {
        this.status = "Medium";
        break;
      }
      case 3: {
        this.status = "Strong";
        break;
      }
      default: {
        this.status = "Error!";
        break;  
      }
    }

  }

  private hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  private hasLowerCase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  private hasNumberSequence(password: string): boolean {
    const match = password.match(/\d{3}/);
    if (match !== null) {
      const numberSequence: string = match[0];
      // To override type errors that TypeScript may throw when casting, first cast to unknown, then to the target type.
      const firstNumber: number = numberSequence[0] as unknown as number;
      const secondNumber: number = numberSequence[1] as unknown as number;
      const thirdNumber: number = numberSequence[2] as unknown as number;

      return firstNumber == (secondNumber - 1) && secondNumber == (thirdNumber - 1);
    }
    return /\d{3}/.test(password);
  }
}
