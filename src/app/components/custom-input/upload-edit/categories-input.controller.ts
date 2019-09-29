import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { GalleryService } from 'src/app/services';

@Component({
  selector: 'app-categories-input',
  templateUrl: './categories-input.component.html',
  styleUrls: ['./categories-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoriesInputComponent),
      multi: true }
  ]
})

export class CategoriesInputComponent implements ControlValueAccessor, OnInit {
  val = '';
  categoriesLoad: ICategory[];
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  onChange: any = () => { };
  onTouch: any = () => { };
  set value(val: string) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  private loadCategories(): void {
    this.galleryService.getCategories()
      .then(data => {
        this.categoriesLoad = data;
      });
  }
}
