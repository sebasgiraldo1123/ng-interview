import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_interfaces/product';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{
  id!: number; // Pertenece a un tipo específico e inicialmente no tiene un valor asignado
  product!: Product;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['postId'];

    this.productService.find(this.id).subscribe((data: Product) => {
      this.product = data;
    }
    );
  }
}
