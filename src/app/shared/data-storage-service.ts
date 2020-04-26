import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import  {Recipe} from '../recipes/recipe.model';
import {map,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angularcomplete2020.firebaseio.com/recipes.json',recipes)
    .subscribe(response => {
       console.log(response);
     });
  }

  fetchRecipes()
  {
    return this.http.get<Recipe[]>('https://angularcomplete2020.firebaseio.com/recipes.json')
    .pipe(map(response => {
       return response.map(recipe => {
         return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
       })
    }),
    tap( recipies => {
      this.recipeService.setRecipes(recipies);
    })
    )
  }

}
