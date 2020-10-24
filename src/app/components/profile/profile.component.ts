import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  name;
  constructor(private dataService: DataService) {
    this.user();
  }
  user() {
    this.dataService.user().subscribe(
      (res) => {
        if (res.success) {
          this.dataService.broadcastLoginChange(res.success.firstname);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    $('#profile').particleground();
    this.user();
  }
}
