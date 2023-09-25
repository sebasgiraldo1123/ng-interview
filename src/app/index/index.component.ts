import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_interfaces/product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(res => {
      this.products = this.products.filter(item => item.id !== id);
      console.log('Post deleted successfully!');
    })
  }
}
