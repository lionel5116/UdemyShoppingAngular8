import { Component, OnInit, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  recipes:Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router:Router,
              private route:ActivatedRoute)
              {}

  ngOnInit() {
     this.subscription =  this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
      this.recipes = this.recipeService.getRecipes();

  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  onNewRecipe()
  {
    //works with the Activated Route import (this is a child route of recipe), that's the only we can use the ['new'] this way
    this.router.navigate(['new'],{relativeTo:this.route});
  }

}
