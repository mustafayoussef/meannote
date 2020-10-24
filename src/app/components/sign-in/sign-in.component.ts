import { AuthService } from './../../services/auth.service';
// tslint:disable: typedef
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  isClicked = false;
  isSuccess = false;
  isFail = false;
  responseMessage = '';
  header = new Headers();

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/notes']);
    }
  }
  signIn = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
  });

  login() {
    this.isClicked = true;
    if (this.signIn.valid) {
      this.authService.signIn(this.signIn.value).subscribe((res) => {
        if (res.success) {
          localStorage.setItem('token', res.accessToken);
          this.responseMessage = res.success;
          this.isClicked = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.router.navigate(['/notes']);
          }, 2000);
        } else if (res.fail) {
          this.responseMessage = res.fail;
          this.isClicked = false;
          this.isFail = true;
          setTimeout(() => {
            this.isFail = false;
          }, 6000);
        }
      });
    } else if (this.signIn.invalid) {
      console.log('your form is invalid');
    }
  }
  email() {
    return this.signIn.get('email');
  }
  password() {
    return this.signIn.get('password');
  }
  ngOnInit(): void {
    $('#signIn').particleground();
  }
}
