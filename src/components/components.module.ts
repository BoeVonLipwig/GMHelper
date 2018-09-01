import { NgModule } from '@angular/core';
import { MapsComponent } from './maps/maps';
import { EntityListComponent } from './entity-list/entity-list';
import {IonicModule} from "ionic-angular";
import {CommonModule} from "@angular/common";
@NgModule({
	declarations: [MapsComponent,
    EntityListComponent],
	imports: [
    CommonModule,
    IonicModule
  ],
	exports: [MapsComponent,
    EntityListComponent]
})
export class ComponentsModule {}
