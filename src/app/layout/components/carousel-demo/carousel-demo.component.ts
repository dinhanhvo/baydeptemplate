import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CarService } from '../../../shared/services/CarService';

@Component({
  selector: 'app-carousel-demo',
  templateUrl: './carousel-demo.component.html',
  styles: [],
    encapsulation: ViewEncapsulation.None
})
export class CarouselDemoComponent implements OnInit {

  cars: any[];

  responsiveOptions;

  constructor(private carService: CarService) { 
      this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 3,
              numScroll: 3
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 2
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }

  ngOnInit() {
    //   this.carService.getCarsSmall().then(cars => {
    //       this.cars = cars
    //   });
  }
}

