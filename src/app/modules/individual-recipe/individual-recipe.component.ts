import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-individual-recipe',
  standalone: true,
  imports: [TopbarComponent, FormsModule],
  templateUrl: './individual-recipe.component.html',
  styleUrl: './individual-recipe.component.scss',
})
export class IndividualRecipeComponent {
  

  ingredients: string[] = [
    '4 Tbsp olive oil',
    '1 ½ Tbsp apple cider vinegar',
    '2 Tbsp minced shallot',
    '1 tsp Dijon mustard',
    '1/4 – 1/2 tsp sea salt',
  ];
  steps: string[] = [
    'Preheat oven to 450 degrees F (230 degrees C).',
    'Use a melon baller to separate and remove seeds and pulp separately from the zucchini, carving out each half and leaving about a half-inch shell. Chop zucchini pulp into pieces about 1/4 inch in diameter. Discard seeds.',
    'Heat olive oil in a large skillet over medium heat. Cook and stir onion and garlic in hot oil until tender, about 5 minutes. Add ground lamb; continue to cook and stir until lamb is lightly browned, 5 to 7 minutes. ',
    'Stir chopped zucchini into the lamb mixture. Reduce heat to medium-low. Simmer mixture until the zucchini is hot, about 3 minutes. Drain excess grease. Season lamb mixture with coarse salt and black pepper.',
    'Remove skillet from heat. Stir tomato sauce, tomatoes, feta cheese, pine nuts, and 1/4 cup mint leaves through the lamb mixture; spoon into the zucchini halves. Put stuffed zucchini halves into a large baking dish. Pour water into the baking dish.',
  ];

  completedStepsMassa: boolean[] = new Array(this.steps.length).fill(false);
  completedStepsFilling: boolean[] = new Array(this.steps.length).fill(false);
}
