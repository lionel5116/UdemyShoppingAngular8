import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Resolve,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../recipes/recipe.model';
import {DataStorageService} from '../shared/data-storage-service';
import {RecipeService} from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverSerice implements Resolve<Recipe[]> {
      constructor(private dataStorageServ: DataStorageService,
                  private recipesService:RecipeService)
      {}

      resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
          const recipes = this.recipesService.getRecipes();
          if(recipes.length === 0)
          {
            return this.dataStorageServ.fetchRecipes();
          }
          else
          {
             return recipes;
          }

      }

}
