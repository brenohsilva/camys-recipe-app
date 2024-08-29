import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Observable, tap } from 'rxjs';
import { ISignIn } from '../interfaces/signIn.interface';
import { IAcessToken } from '../interfaces/accessToken.interface';
import { UserHttpService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private endpoint = environments.baseURL + 'auth/';

  constructor(private http: HttpClient, private userHttpService: UserHttpService) {}

  login(login: ISignIn): Observable<IAcessToken> {
    return this.http.post<IAcessToken>(this.endpoint + 'login', login).pipe(
      tap((response) => {
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem('access_token', response.access_token);
          this.fetchUserProfile();
        }
      })
    );
  }

  getAccessToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private async fetchUserProfile(): Promise<void> {
    const data = await this.userHttpService.getProfile();
    data.subscribe((profile) => {
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('current_user', JSON.stringify(profile));
      }
    });
  }

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
}
