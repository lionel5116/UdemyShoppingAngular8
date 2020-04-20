import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject}  from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService
{
recipesChanged = new Subject<Recipe[]>();

  private recipes:Recipe[] = [new Recipe('Veggie Burger','Recipe for Black Bean Burger Veggie',
                              'https://images.unsplash.com/photo-1562634382-d41bfc15aa4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                              [new Ingredient('Meat',1),
                               new Ingredient('Pasta',40)]),
                               new Recipe('Black Bean Searing Burger',
                               'A different Burger','https://live.staticflickr.com/65535/47992206188_813bb32233_b.jpg',
                               [new Ingredient('Sausage',10),
                               new Ingredient('Buns',5)])];


  constructor(private shoppingListService:ShoppingListService)
  {

  }

  getRecipes()
  {
    return this.recipes.slice(); /*slice with no arguments returns new (copy) of the array */
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[])
  {
     this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe)
  {
     this.recipes.push(recipe);
     this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe:Recipe)
  {
     this.recipes[index]  = newRecipe;
     this.recipesChanged.next(this.recipes.slice());
  }

}
