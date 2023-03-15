import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GuessWordPageRoutingModule } from './guessWord-routing.module';
import { GuessWordPage } from './guessWord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuessWordPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [GuessWordPage],
})
export class GuessWordPageModule {}
