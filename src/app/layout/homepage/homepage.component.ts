import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  
  products = [
    {
      "id": 1,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 11000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (1).jpg"
    },
    {
      "id": 2,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 12000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (10).jpg"
    },
    {
      "id": 3,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 13000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (11).jpg"
    },
    {
      "id": 4,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 14000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (12).jpg"
    },
    {
      "id": 5,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 15000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (13).jpg"
    },
    {
      "id": 6,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 16000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (14).jpg"
    },
    {
      "id": 7,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 1700000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (15).jpg"
    },
    {
      "id": 8,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 18000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (16).jpg"
    },
    {
      "id": 9,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 19000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (17).jpg"
    },
    {
      "id": 10,
      "name": "Máy bơm",
      "description": "Máy bơm công suất cao",
      "price": 20000000,
      "type": "1",
      "image": "../../../assets/images/products/product001 (18).jpg"
    }
];
  constructor() { }

  ngOnInit() {
  }

  gotoChiTiet(pr) {
    console.log('chi tiet san pham');
    console.log(pr);
    // this.router.navigate(['/pr.id']);
  }
}
