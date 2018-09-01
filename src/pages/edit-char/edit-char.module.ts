import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCharPage } from './edit-char';

@NgModule({
  declarations: [
    EditCharPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCharPage),
  ],
})
export class EditCharPageModule {}
