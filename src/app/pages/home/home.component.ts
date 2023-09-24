import { AfterViewInit, Component, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs';

import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  private refresh$ = new EventEmitter<void>();
  users$ = this.refresh$.pipe(
    switchMap(() => this.userService.listUsers())
  );

  displayedColumns: string[] = ['username'];

  constructor(
    private readonly userService: UserService,
  ) {}

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.refresh$.emit();
  }
}
