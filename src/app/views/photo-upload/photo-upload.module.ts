import { PhotoUploadComponent } from './photo-upload.component';
import { TagsCategoriesComponent } from './../../dialogs/tags-categories/tags-categories.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadDirective } from '../../directives';

import { GalleryService,
         AuthService,
         UsersService,
         RefreshService } from '../../services/';

import { MaterialModule } from '../../material.module';
import { PhotoUploadRoutingModule } from './photo-upload-routing.module';
import { EditInputModule } from 'src/app/edit-input.module';

@NgModule({
    declarations: [
        FileUploadDirective,
        TagsCategoriesComponent,
        PhotoUploadComponent
    ],
    imports: [
        CommonModule,
        PhotoUploadRoutingModule,
        EditInputModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [GalleryService, AuthService, UsersService, RefreshService],
    entryComponents: [TagsCategoriesComponent]
})
export class PhotoUploadModule { }
