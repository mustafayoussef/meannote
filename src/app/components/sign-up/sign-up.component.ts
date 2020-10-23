import { AuthService } from './../../services/auth.service';
// tslint:disable: typedef
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  isClicked = false;
  responseMessage = '';
  isSuccess = false;
  isFail = false;
  constructor(private authService: AuthService, private router: Router) {}
  signUp = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
  });
  register() {
    this.isClicked = true;
    if (this.signUp.valid) {
      // console.log(this.signUp);
      this.authService.signUp(this.signUp.value).subscribe((data) => {
        if (data.success) {
          this.signUp.reset();
          this.isClicked = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.router.navigate(['/signin']);
          }, 2000);
          this.responseMessage = data.success;
          console.log(this.responseMessage);
        } else if (data.fail) {
          this.responseMessage = data.fail;
          this.isClicked = false;
          this.isFail = true;
          setTimeout(() => {
            this.isFail = false;
          }, 3000);
          console.log(this.responseMessage);
        }
      });
    } else if (this.signUp.invalid) {
      console.log('your form is invalid');
    }
    // console.log(this.firstname());
  }
  firstname() {
    // console.log(this.signUp.controls.firstname);
    return this.signUp.get('firstname');
  }
  lastname() {
    return this.signUp.get('lastname');
  }
  email() {
    return this.signUp.get('email');
  }
  password() {
    return this.signUp.get('password');
  }
  confirmPassword() {
    return this.signUp.get('confirmPassword');
  }
  ngOnInit(): void {
    $('#signUp').particleground();
  }
}
