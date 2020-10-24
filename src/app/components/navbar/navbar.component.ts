import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name;
  constructor(public authService: AuthService, private router: Router) {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      let decoded = jwt_decode(token);
      console.log(decoded);
      this.name = decoded.firstname;
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
  ngOnInit(): void {}
}
