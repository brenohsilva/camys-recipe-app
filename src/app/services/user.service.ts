import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Observable } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';

@Injectable({ providedIn: 'root' })
export class UserHttpService {
  private endpoint = environments.baseURL + 'users/';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(this.endpoint + 'profile');
  }

  updateProfile(id: number, data: any): Observable<any> {
    return this.http.patch<any>(this.endpoint + id, data);
  }

  updatePassword(id:number, data: any): Observable<any>{
    return this.http.put<any>(this.endpoint + id + '/pass', data)
  }
}
