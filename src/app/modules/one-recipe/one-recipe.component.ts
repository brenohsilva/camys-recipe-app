import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-one-recipe',
  standalone: true,
  imports: [MatDialogModule, NgClass],
  templateUrl: './one-recipe.component.html',
  styleUrl: './one-recipe.component.scss'
})
export class OneRecipeComponent {
  recipe: any[] = [
    {
      title: 'Torta de frango',
      time: 45,
      people: 4,
      type: 1,
      cateogory: 'Sobremesa',
      ingredients: [
        {
          description: '500 g de peito de frango sem pele',
        },
        {
          description: '4 colheres (sopa) de óleo',
        },
        {
          description: '1 cebola picada',
        },
        {
          description: '1 xícara (chá) de ervilhas',
        },
        {
          description: '5 pimentas-do-reino a gosto',
        },
        {
          description: '3 Alhos',
        },
      ],
      steps: [
        {
          id: "s01",
          description: "Bata o leite, o óleo e os ovos no liquidificador em velocidade baixa."
        },
        {
          id: "s02",
          description: "Acrescente aos poucos a farinha, o sal e o fermento."
        },
        {
          id: "s03",
          description: "Despeje metade da massa em uma forma untada e adicione o recheio sobre"
        },
        {
          id: "s04",
          description: "Cubra com o restante de massa e o queijo ralado."
        }
      ],
      typeOfIngredients: [
        {
          dough: 
          [
            { description: "250 ml de leite"}, 
            { description: "2 ovos"},
            { description: "sal a gosto"},
            { description: "queijo ralado a gosto"},
            { description: "3/4 de xícara (chá) de óleo"}
          ],
          filling: 
          [
            { description: "500 g de peito de frango sem pele"}, 
            { description: "4 colheres (sopa) de óleo"},
            { description: "1 cebola picada"},
            { description: "1 xícara (chá) de ervilhas"},
            { description: "pimenta-do-reino a gosto"},
            { description: "1/2 litro de caldo de galinha"}, 
            { description: "1 dente de alho amassado"},
            { description: "3 tomates sem pele e sem sementes"},
            { description: "sal a gosto"},
          ]
        
      }
      ],
      typeOfSteps: [
        {
          dough: 
          [
            { id: 0, description: "Bata o leite, o óleo e os ovos no liquidificador em velocidade baixa"}, 
            { id: 1, description: "Acrescente aos poucos a farinha, o sal e o fermento."},
            { id: 2, description: "Despeje metade da massa em uma forma untada e adicione o recheio sobre ela."},
            { id: 3, description: "Cubra com o restante de massa e o queijo ralado"},
            { id: 4, description: "Leve ao forno preaquecido (180° C) até dourar."}
          ],
          filling: 
          [
            { id: 20, description: "Cozinhe o peito de frango no caldo até ficar macio."}, 
            { id: 21, description: "Separe 1 xícara (chá) de caldo do cozimento e reserve."},
            { id: 22, description: "Refogue os demais ingredientes e acrescente as ervilhas por último."},
            { id: 23, description: "Desfie o frango, misture ao caldo e deixe cozinhar até secar."},
          ]    
      }
      ]
    },
  ];

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
