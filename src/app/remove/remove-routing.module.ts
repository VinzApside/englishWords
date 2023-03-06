import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemovePage } from './remove.page';

const routes: Routes = [
  {
    path: '',
    component: RemovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemovePageRoutingModule {}
