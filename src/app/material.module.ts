import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule,
         MatFormFieldModule,
         MatSelectModule,
         MatProgressSpinnerModule,
         MatChipsModule,
         MatButtonModule,
         MatIconModule,
         MatDialogModule,
         MatCheckboxModule,
         MatInputModule,
         MatToolbarModule,
         MatSnackBarModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCheckboxModule,
        MatInputModule,
        MatToolbarModule,
        MatSnackBarModule
    ],
    exports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCheckboxModule,
        MatInputModule,
        MatToolbarModule,
        MatSnackBarModule
    ]
})

export class MaterialModule { }
