import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environments } from "../environments/environments";
import { ISignUp } from "../interfaces/signUp.interface";

@Injectable({ providedIn: 'root' })
export class SignUpHttpService {
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
    }
    private endpoint = environments.baseURL + 'users';
    private headers: HttpHeaders;
    

    signUp(user: ISignUp): Observable<number | any>{
        return this.http.post<number>(this.endpoint, user, {
            headers: this.headers
        }).pipe(tap((response: number)=> {
            localStorage.setItem('current_user_id', String(response))
        }))

    }
}