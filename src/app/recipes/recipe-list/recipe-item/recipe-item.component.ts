import { Component, OnInit, Input} from '@angular/core';
import {Recipe} from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
   @Input() recipe:Recipe;  /*recieve (input) data from the parent (receive information from the outside) */
   @Input() index:number;

  ngOnInit() {
    console.log("Index recipe-item is  " + this.index);
  }

}
