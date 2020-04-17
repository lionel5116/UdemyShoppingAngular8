import { Injectable,EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
   /*emitters are an extension of a subject
    angular team stresses that emitters are used with @Output( )cases a
    and it is acutally better to use Subjects instead, Subjects have to be
    cleaned up with the onDestroy() Interface when subscribed to
    Angular team says in the future, they deprecate the EventEmitter
    You do not use Subjects with @Output, you typically use subjects with a
    service. Subjects are more efficient. You also use Emitters with making
    ajax calls as well. Emitters are passive, Subjects are active
   */
  //ingredientsChagned = new EventEmitter<Ingredient[]>();
  ingredientsChagned = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients:  Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('tomatos',40)
  ];


  addIngredient(indredient:Ingredient)
  {
    this.ingredients.push(indredient);
    //when this emits, it is subscribed to in the shopping-list component
    //in the ngOnIt() that listens for changes to update the ingredients array
    //this.ingredientsChagned.emit(this.ingredients.slice());
    this.ingredientsChagned.next(this.ingredients.slice());
  }

  getIngredient(index:number)
  {
    return this.ingredients[index];
  }

  getIngredients()
  {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
     this.ingredients.push(...ingredients);
     //this.ingredientsChagned.emit(this.ingredients.slice());
     this.ingredientsChagned.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIngredient:Ingredient)
  {
     this.ingredients[index] = newIngredient;
    //when this emits, it is subscribed to in the shopping-list component
    //in the ngOnIt() that listens for changes to update the ingredients array
    //this.ingredientsChagned.emit(this.ingredients.slice());
     this.ingredientsChagned.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChagned.next(this.ingredients.slice());
  }

}
