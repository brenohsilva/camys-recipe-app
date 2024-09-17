import { NgClass } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../../interfaces/recipe.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-one-recipe',
  standalone: true,
  imports: [MatDialogModule, NgClass, RouterLink],
  templateUrl: './one-recipe.component.html',
  styleUrl: './one-recipe.component.scss'
})
export class OneRecipeComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recipes: Recipe, 
    public dialogRef: MatDialogRef<OneRecipeComponent>,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    console.log(this.recipes)
  }

  ingredients: boolean = true
  steps: boolean = false
  typeOfIngredients: boolean = true
  typeOfSteps: boolean = false
  dough: boolean = true
  filling: boolean = false
  check!: string
  selectedStepIds: number[] = [];

  checkbutton( id: number){
    const index = this.selectedStepIds.indexOf(id);
    if (index === -1) {
      this.selectedStepIds.push(id);
    } else {
      this.selectedStepIds.splice(index, 1);
    }
    
  }

  changeTable(){
    this.ingredients = !this.ingredients
    this.steps = !this.steps
  }

  changingToIngredients(){
    this.ingredients = true
    this.typeOfIngredients = true
    this.typeOfSteps = false
    this.steps = false
  }

  changingToSteps(){
    this.steps = true
    this.typeOfSteps = true
    this.ingredients = false
    this.typeOfIngredients = false
  }

  changingToDough(){
    this.dough = true;
    this.filling = false
  }
  
  changingToFilling(){
    this.dough = false;
    this.filling = true;
  }


}
