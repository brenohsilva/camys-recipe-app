import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { TopbarComponent } from "../topbar/topbar.component";
import { RecipeHttpService } from '../../services/recipe.service';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { CategoryHttpService } from '../../services/category.service';

interface Ingredients {
  name: string,
  type: string
}

interface Stepper {
  name: string,
  type: string
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgClass, NgSwitchCase, NgSwitch, FormsModule, TopbarComponent, LoadingComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})

export class StepperComponent implements OnInit {
  constructor( private recipeService: RecipeHttpService, private categoriesService: CategoryHttpService  ) {}
  
  readonly dialog = inject(MatDialog);
  
  async ngOnInit(): Promise<void> {
    const response = await this.categoriesService.getAllCategories()
    response.subscribe((categories)=> {
      this.categories = categories
    })
  }

  currentStep: number = 1;
  ingredient!: string
  ingredients: Ingredients[] = []
  step!: string
  steppers: Stepper[] = []
  typeIngredients = 'Tipo'
  categories!: any[]
  selectedCategories: string[] = [];
  loading!: boolean
  
  
  recipe = {
    name: '',
    description: '',
    urlImage: '',
    type: 'Selecione um tipo',
    portion: 'Serve quantas pessoas',
    time: '25',
    ingredients: this.ingredients,
    steppers: '',
    selectedCategories: this.selectedCategories

  }

  addIngredient(type: string){
    const newIngredient = {name: this.ingredient, type: type}
    this.ingredients.push(newIngredient)
    this.ingredient = ''
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  addStepper(type: string){
    const newStepper = {name: this.step, type: type}
    this.steppers.push(newStepper)
    this.step = ''
  }

  removeStepper(index: number) {
    this.steppers.splice(index, 1);
  }
  
  nextStep() {
    if (this.currentStep < 5) this.currentStep++;

    if (this.currentStep === 5 ) this.openDialog('0ms', '0ms')
      
      
      // this.createRecipe(this.recipe)

  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  toggleCategory(category: any) {
    const index = this.selectedCategories.indexOf(category.name);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category.name);
    }
  }

  createRecipe(){
    debugger
    const data = this.recipe
    this.recipeService.createRecipe(data).subscribe((response)=> {
      console.log(response)
      if (response.status === '200') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 3000);
      }
    })

  }

  autoResize(event: Event): void {
    const textArea = event.target as HTMLTextAreaElement;
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.currentStep ++ 
        this.createRecipe()
      } else {
        alert("Escoheu o nao")
        this.currentStep === 4
      }
    })
  }
}
