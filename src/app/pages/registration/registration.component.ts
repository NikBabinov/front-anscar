import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TextFormConstants } from '../../constants/text-form-constant';
import { Router } from '@angular/router';
import { UserModel } from '../../model/user.model';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  styleUrls: ['./registration.component.scss'],
  imports: [CommonModule],
  providers: [AuthService]
})
export class RegistrationComponent {
  user: UserModel = {} as UserModel;

  @ViewChild('emailLabel', { static: false }) emailLabel!: ElementRef;
  @ViewChild('email', { static: false }) email!: ElementRef;
  @ViewChild('passwordLabel', { static: false }) passwordLabel!: ElementRef;
  @ViewChild('password', { static: false }) password!: ElementRef;
  @ViewChild('passwordRepeatLabel', { static: false }) passwordRepeatLabel!: ElementRef;
  @ViewChild('passwordRepeat', { static: false }) passwordRepeat!: ElementRef;

  protected readonly TEXT_FORM_CONSTANT = TextFormConstants;

  isShowAuthorizationPassword = false;
  isValidEmail = false;
  isValidPassword = false;

  emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  defaultEmailLabel = this.TEXT_FORM_CONSTANT.USER_FORM_EMAIL;
  failValidationEmail = this.TEXT_FORM_CONSTANT.USER_FORM_EMAIL_FALSE;

  private readonly COLOR_RED = 'red';
  private readonly COLOR_BLACK = 'black';

  constructor(private _router: Router, private renderer: Renderer2, private authService: AuthService) {}

  showAuthorizationPassword(): void {
    this.isShowAuthorizationPassword = !this.isShowAuthorizationPassword;
  }

  checkValidForms(): void {
    const emailValid = this.validateEmail(this.email.nativeElement.value);
    const passwordValid = this.validatePassword(this.password.nativeElement.value);
    const repeatPasswordValid = this.validateRepeatPassword(this.password.nativeElement.value, this.passwordRepeat.nativeElement.value);

    if (emailValid && passwordValid && repeatPasswordValid) {
      this.resetEmailLabelStyles();
      this.resetPasswordLabelStyles();
      this.register(); // Добавляем вызов метода регистрации
    } else {
      if (!emailValid) {
        this.setEmailLabelFail();
      } else {
        this.resetEmailLabelStyles();
      }

      if (!passwordValid || !repeatPasswordValid) {
        this.setPasswordLabelFail();
      } else {
        this.resetPasswordLabelStyles();
      }
    }
  }

  validateEmail(email: string): boolean {
    this.isValidEmail = this.emailRe.test(email);
    return this.isValidEmail;
  }

  validatePassword(password: string): boolean {
    this.isValidPassword = password.length >= 6;
    return this.isValidPassword;
  }

  private validateRepeatPassword(password: string, repeatPassword: string): boolean {
    return password === repeatPassword;
  }

  setEmailLabelFail(): void {
    this.emailLabel.nativeElement.textContent = this.failValidationEmail;
    this.renderer.setStyle(this.emailLabel.nativeElement, 'color', this.COLOR_RED);
  }

  setPasswordLabelFail(): void {
    this.renderer.setStyle(this.passwordLabel.nativeElement, 'color', this.COLOR_RED);
    this.renderer.setStyle(this.passwordRepeatLabel.nativeElement, 'color', this.COLOR_RED);
  }

  resetEmailLabelStyles(): void {
    this.emailLabel.nativeElement.textContent = this.defaultEmailLabel;
    this.renderer.setStyle(this.emailLabel.nativeElement, 'color', this.COLOR_BLACK);
  }

  resetPasswordLabelStyles(): void {
    this.renderer.setStyle(this.passwordLabel.nativeElement, 'color', this.COLOR_BLACK);
    this.renderer.setStyle(this.passwordRepeatLabel.nativeElement, 'color', this.COLOR_BLACK);
  }

  register(): void {
    this.user.email = this.email.nativeElement.value;
    this.user.password = this.password.nativeElement.value;

    this.authService.register(this.user).subscribe({
      next: (data: UserModel) => {
        console.log('Registration successful', data);
        this._router.navigate(['/']).then(() => {
          console.log('Navigation successful');
        }).catch(error => {
          console.error('Navigation error', error);
        });
      },
      error: (error: any) => {
        console.error('Registration error', error);
      },
      complete: () => {
        console.log('Registration request completed');
      }
    });
  }
}
