import { Component, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GalleryService, RefreshService } from 'src/app/services';
import { ITag } from 'src/app/models/tag.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./categories-tags-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true }
  ]
})

export class TagsInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  val = '';
  tagsLoad: ITag[];
  subscription: Subscription;

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
                this.subscription = this.refreshService.customObservable.subscribe(() => {
                  this.loadTags();
                }
                );
              }

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
    this.refreshService.callComponentMethod();
    this.galleryService.getTags()
      .then(data => {
        this.tagsLoad = data;
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}


}
