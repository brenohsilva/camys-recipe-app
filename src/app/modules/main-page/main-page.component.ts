import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar.component";
import { SkeletonComponent } from '../skeleton/skeleton.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RecipeComponent } from '../recipe/recipe.component';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, TopbarComponent, TopbarComponent, SkeletonComponent, MatButtonModule, MatDialogModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  currentPage: number = 1;
  itemsPerPage: number = 3;
  isLoading = false
  
  recipes: any[] = [
    {
      title: 'Torta de frango',
      time: '45 min',
      image: '../../../assets/tortaImg.jpg',
    },
    {
      title: 'Yakisoba',
      time: '30 min',
      image: '../../../assets/yaksoba.jpg',
    },
    {
      title: 'Brownie',
      time: '35 min',
      image: '../../../assets/brownie.jpg',
    },
    {
      title: 'Tapioca',
      time: '15 min',
      image: '../../../assets/tapioca.jpg',
    },
    {
      title: 'Bolo de rolo',
      time: '120 min',
      image: '../../../assets/bolorolo.jpg',
    },
    {
      title: 'Macarronada',
      time: '40 min',
      image: '../../../assets/macarronada.jpg',
    },
    {
      title: 'Baiao de dois',
      time: '60 min',
      image: '../../../assets/baiaodois.jpg',
    },
    {
      title: 'Lasanha',
      time: '55 min',
      image: '../../../assets/lasanha.jpg',
    },
    {
      title: 'Pipoca Granulada',
      time: '15 min',
      image: '../../../assets/pipoca.jpeg',
    },
    {
      title: 'Bobó de camarão',
      time: '15 min',
      image: '../../../assets/bobo.jpg',
    },
  ];

  openDialog() {
    const dialogRef = this.dialog.open(OneRecipeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      
      this.isLoading = true
    }, 2000);
  }

  get paginatedRecipes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.recipes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.recipes.length / this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.recipes.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
}
