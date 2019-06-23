import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  state = 'SignOut';
  constructor() { }

  ngOnInit() {
  }

  authenticate(state) {
    if (state === 'SignIn') {
      // login
    } else {
      // logout
    }
  }

}
