import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  registerPending = false;

  constructor(
    readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.form = formBuilder.group({
      username: ['', [ Validators.required, Validators.minLength(6) ]],
      password: ['', [ Validators.required, Validators.minLength(4) ]],
    });
  }

  registerUser() {
    if (this.form.invalid) {
      return;
    }

    this.registerPending = true;
    this.userService
      .registerUser(this.form.value)
      .pipe(
        finalize(() => this.registerPending = false),
      )
      .subscribe({
        next: () => {
          alert('User registered successfully!');
          this.router.navigate(['/']);
        },
        error: ((err: any) => alert(err.error.message)),
      });
  }
}
