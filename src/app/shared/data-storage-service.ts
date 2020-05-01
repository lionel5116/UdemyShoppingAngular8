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

  /*
  fetchRecipes()
  {
    //I changed my password over to BL on 4/30/2020 for the firebase pwd
    //below is advanced observable chaining ...
    //take means I only want one subscription only for the user
    //pipe means I want to do some more work once the request comes back
    //below is also coded this way because we are using resolver (middleware) wireup
    return this.authsrv.user.pipe(take(1),exhaustMap(user => {
      return this.http.get<Recipe[]>('https://angularcomplete2020.firebaseio.com/recipes.json',
         {
           params: new HttpParams().set('auth', user.token)
         }
      );
    }),
    map(response => {
      return response.map(recipe => {
        return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
   }), //map
     tap( recipies => {
       this.recipeService.setRecipes(recipies);
     }) //tap
    );  //pipe

  }
  */

  fetchRecipes()
  {
    //I changed my password over to BL on 4/30/2020 for the firebase pwd
    //below is advanced observable chaining ...
    //take means I only want one subscription only for the user
    //pipe means I want to do some more work once the request comes back
    //below is also coded this way because we are using resolver (middleware) wireup
    //i modified the code from the commented out code above because we are using an HTTP INTERCEPTOR NOW *****
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
