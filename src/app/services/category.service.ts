import { Injectable } from "@angular/core";
import { environments } from '../environments/environments';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class CategoryHttpService {
    constructor(private http: HttpClient) {}
    private endpoint = environments.baseURL + 'categories';

    getAllCategories(): Observable<any>{
        return this.http.get<any>(this.endpoint)
    }
}