import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [],
  templateUrl: './star.html',
  styleUrl: './star.css'
})
export class Star {
  @Input() rating: number = 1;
  @Input() id: number = 0;
  @Output() ratingClicked = new EventEmitter<number>();

  get stars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isFilled(starNumber: number): boolean {
    return starNumber <= this.rating;
  }

  onStarClick(): void {
    this.ratingClicked.emit(this.id);
  }
}
