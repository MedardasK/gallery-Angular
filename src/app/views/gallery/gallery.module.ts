import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery.component';
import { ItemsCountPipe } from 'src/app/pipes/items-count.pipe';
import { PhotoComponent } from 'src/app/components';
import { PhotoEditComponent,
         DeleteConfirmComponent,
         PhotoOneComponent } from '../../dialogs';
import { NameInputComponent } from '../../components/custom-input/upload-edit';
import { GalleryService,
         AuthService,
         UsersService } from '../../services/';
import { EditInputModule } from 'src/app/edit-input.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { MaterialModule } from '../../material.module';


@NgModule({
    declarations: [
        PhotoEditComponent,
        DeleteConfirmComponent,
        PhotoOneComponent,
        NameInputComponent,
        GalleryComponent,
        ItemsCountPipe,
        PhotoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        GalleryRoutingModule,
        EditInputModule
    ],
    providers: [GalleryService, AuthService, UsersService],
    entryComponents: [PhotoOneComponent, PhotoEditComponent, DeleteConfirmComponent]

})
export class GalleryModule { }
