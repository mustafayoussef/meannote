import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  name;
  tok;
  constructor(
    public authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {
    this.getName();
  }

  getName() {
    this.isLogin = true;
    this.dataService.name.subscribe((val) => {
      this.name = val;
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.name = '';
    this.router.navigate(['/signin']);
  }
  ngOnInit(): void {
    this.getName();
  }
}
