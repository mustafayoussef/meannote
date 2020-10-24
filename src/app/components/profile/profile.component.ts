import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  firstname;
  lastname;
  email;

  constructor(private dataService: DataService) {
    this.user();
  }
  user() {
    this.dataService.user().subscribe(
      (res) => {
        if (res.success) {
          console.log(res);
          this.dataService.broadcastLoginChange(res.success.firstname);
          this.firstname = res.success.firstname;
          this.lastname = res.success.lastname;
          this.email = res.success.email;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    $('#profile').particleground();
    // this.user();
  }
}
