import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { GalleryService } from 'src/app/services';
import { ITag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true }
  ]
})

export class TagsInputComponent implements ControlValueAccessor, OnInit {
  val = '';
  tagsLoad: ITag[];
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
    this.loadTags();
  }

  onChange: any = () => { };
  onTouch: any = () => { };
  set value(val: string) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  private loadTags(): void {
    this.galleryService.getTags()
      .then(data => {
        this.tagsLoad = data;
      });
  }
}
