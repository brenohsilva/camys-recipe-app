import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CarouselComponent } from '../shared/carousel/carousel.component';
import { NgClass } from '@angular/common';
import { SignUpHttpService } from '../../services/signUp.service';
import { Router } from '@angular/router';
import { ISignUp } from '../../interfaces/signUp.interface';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [CarouselComponent, NgClass, FormsModule],
})
export class SignUpComponent {
  constructor(
    private signUpService: SignUpHttpService,
    private route: Router,
    private toastr: ToastrService,
  ) {}

  isExist: boolean = false

  @Input() user: ISignUp = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };

  async submit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (form.checkValidity()) {
      this.signUpService.signUp(this.user).subscribe((response) => {
        if (response.status === 409) {
          this.isExist = true
        } else {
          this.toastr.success('', 'Usuário Criado com sucesso!', {
            progressBar: true
          });
          this.route.navigate(['/login'])
        }
      });
    } else {
      event.stopPropagation();
      console.log('something Went Wrong');
    }
    form.classList.add('was-validated');
  }
}
