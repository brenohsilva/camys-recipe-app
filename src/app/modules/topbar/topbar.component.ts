import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  
  currentProfile!: IProfile;
  currentName!: string;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      const data = localStorage.getItem('current_user');
      if (data) {
        const currentUser = JSON.parse(data);
        this.currentName = currentUser.first_name;
      } else {
        this.currentName = 'Visitante';
      }
    }
  }
  

  ngOnInit(): void {
  }

  createRecipe(){
    this.router.navigate(['/stepper'])
  }

  login(){
    this.router.navigate(['/login'])
  }

  signUp(){
    this.router.navigate(['/sign-up'])
  }

  logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('current_user')
    this.router.navigate(['/login'])
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }

}
