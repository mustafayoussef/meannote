import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  isClicked = false;
  isSuccess = false;
  isFail = false;
  responseMessage = '';
  constructor(private authService: AuthService, private router: Router) {}
  forget = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  email() {
    return this.forget.get('email');
  }
  send() {
    this.authService.forgetPassword(this.forget.value).subscribe((res) => {
      if (res.success) {
        this.isSuccess = true;
        this.responseMessage = res.success;
        setTimeout(() => {
          this.isSuccess = false;
          this.router.navigate(['/signin']);
        }, 2000);
      }
    });
  }

  ngOnInit(): void {
    $('#forget').particleground();
  }
}
