import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionComponent } from './connexion/connexion.component';
import { CreationComponent } from './creation/creation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'connexion', component: ConnexionComponent },
      { path: 'creation', component: CreationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteRoutingModule { }
