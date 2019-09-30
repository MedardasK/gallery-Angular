import { NgModule } from '@angular/core';
import { DescriptionInputComponent,
         CategoriesInputComponent,
         TagsInputComponent } from './components/custom-input/upload-edit';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DescriptionInputComponent,
        CategoriesInputComponent,
        TagsInputComponent
    ],
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        DescriptionInputComponent,
        CategoriesInputComponent,
        TagsInputComponent
    ]

})
export class EditInputModule { }
