import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guessWord',
    pathMatch: 'full',
  },
  {
    path: 'remove',
    loadChildren: () =>
      import('./components/remove/remove.module').then(
        (m) => m.RemovePageModule
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./components/add/add.module').then((m) => m.AddPageModule),
  },

  {
    path: ':id',
    loadChildren: () =>
      import('./components/guessWord/guessWord.module').then(
        (m) => m.GuessWordPageModule
      ),
  },
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
