import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,
          HttpEvent } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { PhotoComponent } from './components/photo/photo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoOneComponent } from './dialogs/photo-one/photo-one.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ItemsCountPipe } from './pipes/items-count.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCheckboxModule } from '@angular/material';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { PhotoEditComponent } from './dialogs/photo-edit/photo-edit.component';
import { LoginComponent } from './views/login/login.component';
import { FileUploadDirective } from './directives/file-upload.directive';
import { FileSizePipe } from './pipes/file-size.pipe';


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoOneComponent,
    ItemsCountPipe,
    PhotoUploadComponent,
    PhotoEditComponent,
    LoginComponent,
    FileUploadDirective,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoOneComponent, PhotoComponent, PhotoEditComponent]
})
export class AppModule { }
