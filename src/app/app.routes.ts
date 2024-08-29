import { Routes, provideRouter } from '@angular/router';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { LoginComponent } from './modules/login/login.component';
import { RecipeComponent } from './modules/recipe/recipe.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { StepperComponent } from './modules/stepper/stepper.component';
import { IndividualRecipeComponent } from './modules/individual-recipe/individual-recipe.component';
import { FavoritesComponent } from './modules/favorites/favorites.component';
import { MyRecipesComponent } from './modules/my-recipes/my-recipes.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: MainPageComponent },
    { path: 'recipe', component: RecipeComponent },
    {path: 'sign-up', component: SignUpComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'stepper', component: StepperComponent},
    {path: 'individual-recipe', component: IndividualRecipeComponent},
    {path: 'favorites', component: FavoritesComponent},
    {path: 'my-recipes', component: MyRecipesComponent},
];

