import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemovePageRoutingModule } from './remove-routing.module';

import { RemovePage } from './remove.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemovePageRoutingModule
  ],
  declarations: [RemovePage]
})
export class RemovePageModule {}
