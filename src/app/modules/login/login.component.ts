import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { AuthHttpService } from '../../services/auth.service';
import { ISignIn } from '../../interfaces/signIn.interface';
import { Route, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthHttpService, private toastr: ToastrService){}

 body: ISignIn = {
  email: '',
  password: ''
 }

 isValid = true

 async login() {
  try {
    this.authService.login(this.body).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Login ou senha invalidos', 'Falha ao fazer login', {
            progressBar: true
          })
        }
      },
      error: (error) => {
        if (error.message === 'Unauthorized') {
          this.isValid = false;
        } else {
          this.isValid = false;
          this.toastr.error('Login ou senha invalidos', 'Falha ao fazer login', {
            progressBar: true
          })
        }
      }
    });
  } catch (error) {
    this.isValid = false;
  }
}
}
