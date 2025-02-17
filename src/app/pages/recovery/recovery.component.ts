import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {TextFormConstants} from '../../constants/text-form-constant';
import {AuthService} from '../../service/auth/auth.service';
import {UserModel} from '../../model/user.model';


@Component({
  selector: 'app-recovery',
  imports: [],
  templateUrl: './recovery.component.html',
  standalone: true,
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent {
  user: UserModel = {} as UserModel;

  protected readonly TEXT_CONSTANTS_FORM = TextFormConstants;
  @ViewChild('email', {static: false}) email!: ElementRef;
  @ViewChild('emailLabel', {static: false}) emailLabel!: ElementRef;
  isValidEmail = false;
  readonly emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  readonly failValidationEmail = this.TEXT_CONSTANTS_FORM.USER_FORM_EMAIL_FALSE;
  readonly defaultEmailLabel = this.TEXT_CONSTANTS_FORM.USER_FORM_EMAIL;

  constructor(private renderer: Renderer2, private authService: AuthService) {
  }

  recoveryPassword(): void {
    const emailValid = this.validateEmail(this.email.nativeElement.value);
    this.user.email = this.email.nativeElement.value;

    if (emailValid) {
      this.resetEmailLabelStyles();
      this.authService.recoverUser(this.user).subscribe({
        next: (data: any) => {
          console.log('Password recovery successful', data);
          // TODO Handle successful recovery, such as showing a confirmation message
        },
        error: (error: any) => {
          console.error('Password recovery error', error);
          // Handle recovery error, such as showing an error message to the user
        },
        complete: () => {
          console.log('Password recovery request completed');
          //TODO Any additional actions upon completion, if needed
        }
      });
    } else {
      this.setEmailLabelFail();
    }
  }


  private validateEmail(email: string): boolean {
    this.isValidEmail = this.emailRe.test(email);
    return this.isValidEmail;
  }

  private setEmailLabelFail(): void {
    this.emailLabel.nativeElement.textContent = this.failValidationEmail;
    this.renderer.setStyle(this.emailLabel.nativeElement, 'color', 'red');
  }

  private resetEmailLabelStyles(): void {
    this.emailLabel.nativeElement.textContent = this.defaultEmailLabel;
    this.renderer.setStyle(this.emailLabel.nativeElement, 'color', 'black');
  }
}
