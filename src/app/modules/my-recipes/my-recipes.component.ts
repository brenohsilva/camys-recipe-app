import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [TopbarComponent],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {

}
