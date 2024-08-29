import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { TopbarComponent } from "../topbar/topbar.component";

interface Ingredients {
  name: string,
  type: string
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgClass, NgSwitchCase, NgSwitch, FormsModule, TopbarComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})

export class StepperComponent {
  currentStep: number = 4;
  urlImage!: string

  ingredient!: string
  ingredients: Ingredients[] = []
  typeIngredients = 'Tipo'
  categories: string[] = ["Café da Manhã", "Almoço", "Jantar", "Sobremesa", "Doce", "Salgados", "Fitness", "No Carbo"]
  selectedCategories: string[] = [];

  addIngredient(type: string){
    const newIngredient = {name: this.ingredient, type: type}
    this.ingredients.push(newIngredient)
    this.ingredient = ''
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
  
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
  }
}
