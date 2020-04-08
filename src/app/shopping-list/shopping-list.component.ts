import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
   ingredients:  Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    //now subscribe to emmiter in service to listen for changes in
    //the ingredients array
    this.shoppingListService.ingredientsChagned
    .subscribe((ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    );
  }


}
