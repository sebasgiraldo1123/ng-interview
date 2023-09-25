import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm!: FormGroup;

  constructor(
    public productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      imageURL: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.createForm.controls;
  }

  submit() {
    this.productService.create(this.createForm.value).subscribe((res: any) => {
      console.log('Post created successfully!');

      // Redirecciona al index luego de crear el producto
      this.router.navigateByUrl('index');
    })
  }
}
