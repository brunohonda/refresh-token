import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loginPending = false;

  constructor(
    readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    this.loginPending = true;
    this.userService
      .login(this.form.value)
      .pipe(
        finalize(() => this.loginPending = false),
      )
      .subscribe({
        next: () => {
          alert('User logged successfully!');
          this.router.navigate(['/']);
        },
        error: ((err: any) => alert(err.error.message)),
      });
  }
}
