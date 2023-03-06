import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuessWordPage } from './guessWord.page';

const routes: Routes = [
  {
    path: '',
    component: GuessWordPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuessWordPageRoutingModule {}
