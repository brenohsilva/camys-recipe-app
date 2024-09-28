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

    getOneRecipe(id: string): Observable<any>{
        return this.http.get<any>(`${this.endpoint}/${id}`);
    }

    saveFavorite(recipeId: string): Observable<any>{
        const data = {
            recipes_id: recipeId
        }   
        console.log(recipeId)
        return this.http.post<any>(environments.baseURL + 'favorites', data)
    }

    removeFavorite(favoriteId: string): Observable<any>{
        return this.http.delete<any>(`${environments.baseURL}favorites/${favoriteId}`)
    }

    findOneFavorite(recipeId: string): Observable<any>{
        return this.http.get<any>(`${environments.baseURL}favorites/${recipeId}`)
    }

    findAllFavorites(): Observable<any> {
        return this.http.get<any>(`${environments.baseURL}favorites`)
    }
}