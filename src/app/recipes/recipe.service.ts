import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService
{

  recipeSelected = new EventEmitter<Recipe>();

  private recipes:Recipe[] = [new Recipe('Veggie Burger','Recipe for Black Bean Burger Veggie','https://images.unsplash.com/photo-1562634382-d41bfc15aa4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'),
  new Recipe('Black Bean Searing Burger','A different Burger','https://live.staticflickr.com/65535/47992206188_813bb32233_b.jpg')];


  getRecipes()
  {
    return this.recipes.slice(); /*slice with no arguments returns new (copy) of the array */
  }

}
