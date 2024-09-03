import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { IProfile } from '../../interfaces/profile.interface';
import { UserHttpService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, TopbarComponent, TopbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  menuNav: string = 'personal'
  currentPassword: string = ''
  newPassword: string = ''
  repeatNewPassword: string = ''
  checkPasswords: boolean = true
  myProfile: IProfile = {
    first_name: '',
    last_name: '',
    email: ''
  };

  
  constructor( private profileService: UserHttpService, private toastr: ToastrService, private route:  Router){}
  async ngOnInit() {
    await this.fetchMyProfile()
  }

 async fetchMyProfile(){
  if (this.isLocalStorageAvailable()) {
    const currentProfile = localStorage.getItem('current_user')
    if (currentProfile) {
      this.myProfile = JSON.parse(currentProfile)
      
    } else {
      const response = await this.profileService.getProfile()
      response.subscribe((data) => {
        this.myProfile = data
      })
    }
  }
 }

 async updateProfile(type: string){
  if (type === 'password') {
    this.updatePassword()
  } else {
    const id = this.myProfile.id
     const response = this.profileService.updateProfile(Number(id), this.myProfile)
     response.subscribe((data) => {
      localStorage.setItem('current_user', JSON.stringify(this.myProfile))
      console.log(data)
      this.toastr.success('', 'Usuário atualizado!', {
        progressBar: true
      });
     }, (error) => {
      this.toastr.error('Por favor, tente novamente', 'Falha ao atualizar', {
        progressBar: true
      })
     }
    )
  }
 }

async updatePassword(){
  if (this.newPassword === this.repeatNewPassword) {
    const data = {
      current_password: this.currentPassword,
      new_password: this.newPassword
    }
    const response = this.profileService.updatePassword(Number(this.myProfile.id), data)
    response.subscribe((data)=> {
      
      if (data.message === "User updated successfully") {
        this.toastr.success('', 'Senha atualizada!', {
          progressBar: true
        });
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 2000);
      } else {
        this.toastr.error('', 'Não foi possivel atualizar a senha', {
          progressBar: true
        })
      }

    })
  }
  else{
    this.checkPasswords = false
  }
}


//  FUNÇÃO AUXILIARES
 
 private isLocalStorageAvailable(): boolean {
  try {
    const test = 'localStorageTest';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
 changingMenu(menu: string){
    this.menuNav = menu
  }
}


