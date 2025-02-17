import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TextFormConstants } from '../../constants/text-form-constant';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  standalone: true,
  providers: [AuthService]
})
export class AuthorizationComponent {
  user: UserModel = {} as UserModel;

  @ViewChild('email', { static: false }) email!: ElementRef;
  @ViewChild('emailLabel', { static: false }) emailLabel!: ElementRef;
  @ViewChild('password', { static: false }) password!: ElementRef;
  @ViewChild('passwordLabel', { static: false }) passwordLabel!: ElementRef;

  protected readonly TEXT_CONSTANTS_FORM = TextFormConstants;
  isShowAuthorizationPassword = false;
  isValidEmail = false;
  isValidPassword = false;
  emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  defaultEmailLabel = this.TEXT_CONSTANTS_FORM.USER_FORM_EMAIL;
  failValidationEmail = this.TEXT_CONSTANTS_FORM.USER_FORM_EMAIL_FALSE;

  private readonly COLOR_RED = 'red';
  private readonly COLOR_BLACK = 'black';

  constructor(private _router: Router, private renderer: Renderer2, private authService: AuthService) {}

  showAuthorizationPassword(): void {
    this.isShowAuthorizationPassword = !this.isShowAuthorizationPassword;
  }

  checkValidForms(): void {
    const emailValid = this.validateEmail(this.email.nativeElement.value);
    const passwordValid = this.validatePassword(this.password.nativeElement.value);

    if (emailValid && passwordValid) {
      this.resetLabelStyles();
      this.authorize();
    } else {
      if (!emailValid) {
        this.setEmailLabelFail();
      } else {
        this.resetEmailLabelStyles();
      }

      if (!passwordValid) {
        this.setPasswordLabelFail();
      } else {
        this.resetPasswordLabelStyles();
      }
    }
  }

  openRegistrationUserForm(): void {
    this._router.navigate(['/registration']).then(
      (success) => {
        //TODO  Handle successful registration if needed
      },
      (error) => {
        //TODO  Handle registration failure, possibly add logger
      }
    );
  }

  openRecoveryUserForm(): void {
    this._router.navigate(['/recovery']).then(
      (success) => {
        //TODO  Handle successful recovery if needed
      },
      (error) => {
        // TODO Handle recovery failure, possibly add logger
      }
    );
  }

  validateEmail(email: string): boolean {
    this.isValidEmail = this.emailRe.test(email);
    return this.isValidEmail;
  }

  validatePassword(password: string): boolean {
    this.isValidPassword = password.length >= 1;
    return this.isValidPassword;
  }

  setEmailLabelFail(): void {
    this.emailLabel.nativeElement.textContent = this.failValidationEmail;
    this.renderer.setStyle(this.emailLabel.nativeElement, 'color', this.COLOR_RED);
  }

  setPasswordLabelFail(): void {
    this.renderer.setStyle(this.passwordLabel.nativeElement, 'color', this.COLOR_RED);
  }

  resetLabelStyles(): void {
    this.resetEmailLabelStyles();
    this.resetPasswordLabelStyles();
  }

  resetEmailLabelStyles(): void {
    this.emailLabel.nativeElement.textContent = this.defaultEmailLabel;
    this.renderer.setStyle(this.emailLabel.nativeElement, 'color', this.COLOR_BLACK);
  }

  resetPasswordLabelStyles(): void {
    this.renderer.setStyle(this.passwordLabel.nativeElement, 'color', this.COLOR_BLACK);
  }

  private authorize(): void {
    this.user.email = this.email.nativeElement.value;
    this.user.password = this.password.nativeElement.value;

    this.authService.login(this.user).subscribe({
      next: (data: UserModel) => {
        console.log('Authorization successful', data);
        this._router.navigate(['/']).then(() => {
          console.log('Navigation successful');
        }).catch(error => {
          console.error('Navigation error', error);
        });
      },
      error: (error: any) => {
        console.error('Authorization error', error);
      },
      complete: () => {
        console.log('Authorization request completed');
      }
    });
  }


}
