import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  token: any;
  isClicked = false;
  responseMessage = '';
  isSuccess = false;
  isFail = false;
  constructor(
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }
  changePass = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
  });
  change() {
    this.authService
      .changePassword(this.token, this.changePass.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.isSuccess = true;
          this.responseMessage = res.success;
          setTimeout(() => {
            this.isSuccess = false;
            this.router.navigate(['/signin']);
          }, 2000);
        },
        (error) => {
          this.isFail = true;
          this.responseMessage = error.error.error.message.fail;
          setTimeout(() => {
            this.isFail = false;
          }, 7000);
        }
      );
  }
  password() {
    return this.changePass.get('password');
  }
  confirmPassword() {
    return this.changePass.get('confirmPassword');
  }
  ngOnInit(): void {
    $('#changePass').particleground();
  }
}
