import { Injectable } from "@angular/core";
import { environments } from '../environments/environments';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RecipeHttpService {
    constructor(private http: HttpClient) {}
    private endpoint = environments.baseURL + 'recipes';

    createRecipe(recipe: any): Observable<any>{
        return this.http.post<any>(this.endpoint + '/create', recipe)
    }

    getAllRecipes(): Observable<any>{
        return this.http.get<any>(this.endpoint)
    }
}