import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
  ngOnInit(): void {}
}
