import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  posts: any[] = [
    {
      image: '../../../assets/girl.jpg',
      description: 'Salve suas principais receitas e aprenda coisas novas com as melhores da cozinha.'
    },
    {
      image: '../../../assets/book.jpg',
      description: 'Aqui você encontra sempre as melhores e mais inusitadas receitas de todo o país.',
    },
  ];

  
  ngOnInit(): void {
    console.log("Iniciou")
  }

  currentPage: number = 1;
  itemsPerPage: number = 1;

  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.posts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.posts.length) {
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
