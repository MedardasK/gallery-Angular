import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { GalleryService, RefreshService } from 'src/app/services';

@Component({
  selector: 'app-categories-input',
  templateUrl: './categories-input.component.html',
  styleUrls: ['./categories-tags-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoriesInputComponent),
      multi: true }
  ]
})

export class CategoriesInputComponent implements ControlValueAccessor {
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

  constructor(private galleryService: GalleryService,
              private refreshService: RefreshService) {
                this.refreshService.customObservable.subscribe(() => {
                  this.loadCategories();
                }
                );
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
