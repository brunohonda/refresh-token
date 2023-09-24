import { Component } from '@angular/core';

import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users$ = this.userService.listUsers();

  constructor(
    private readonly userService: UserService,
  ) { }
}
