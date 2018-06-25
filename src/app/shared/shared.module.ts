import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdGridListModule,
  MdDialogModule,
  MdAutocompleteModule,
  MdMenuModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdRadioModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSelectModule,
} from '@angular/material';
import {
  ConfimDialogComponent
} from './confim-dialog/confim-dialog.component';
import {
  DirectiveModule
} from '../directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageListComponent } from './image-list/image-list.component'
@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageListComponent,
  ],
  declarations: [
    ConfimDialogComponent,
    ImageListComponent
  ],
  entryComponents: [
    ConfimDialogComponent
  ]
})
export class SharedModule { }
