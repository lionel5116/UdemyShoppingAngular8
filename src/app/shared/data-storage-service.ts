import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import  {Recipe} from '../recipes/recipe.model';
import {map,tap, take, exhaustMap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authsrv: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angularcomplete2020.firebaseio.com/recipes.json',recipes)
    .subscribe(response => {
       console.log(response);
     });
  }


  fetchRecipes()
  {
    //the auth-interceptor handles the token information/authentication to allow you fetch
    //from the server
      return this.http.get<Recipe[]>('https://angularcomplete2020.firebaseio.com/recipes.json'
      )
    .pipe(
      map(response => {
        return response.map(recipe => {
         return {
          ...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
     }), //map
    tap( recipies => {
        this.recipeService.setRecipes(recipies);
      }) //tap
    );  //pipe

  }

}
