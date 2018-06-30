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
  MdButtonToggleModule,
  MdChipsModule,
  MdTabsModule
} from '@angular/material';
import {
  ConfimDialogComponent
} from './confim-dialog/confim-dialog.component';
import {
  DirectiveModule
} from '../directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageListComponent } from './image-list/image-list.component';
import { ServiceModule } from '../service/service.module';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component'
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
    ServiceModule.forRoot(),
    MdButtonToggleModule,
    MdChipsModule,
    MdTabsModule
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
    AgeInputComponent,
    MdButtonToggleModule,
    MdChipsModule,
    ChipsListComponent,
    MdTabsModule
  ],
  declarations: [
    ConfimDialogComponent,
    ImageListComponent,
    AgeInputComponent,
    ChipsListComponent
  ],
  entryComponents: [
    ConfimDialogComponent
  ]
})
export class SharedModule { }
