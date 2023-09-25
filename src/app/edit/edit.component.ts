import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Product } from '../_interfaces/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id!: number;
  product!: Product;
  editForm!: FormGroup;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.productService.find(this.id).subscribe((data: Product) => {
      this.product = data;
    });

    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      imageURL: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.editForm.controls;
  }

  submit() {
    this.productService.update(this.id, this.editForm.value).subscribe((res: any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('index');
    })
  }

}
