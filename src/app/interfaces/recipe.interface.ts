import { CategorySelected } from "./categories.interface";
import { Ingredient } from "./ingredients.interface";
import { Step } from "./step.interface";

export interface Recipe {
    id: number;
    users_id: number;
    name: string;
    image: string;
    description: string;
    type: number;
    time: number;
    portions: number;
    ingredients: Ingredient[];
    steps: Step[];
    categories_selected: CategorySelected[];
  }