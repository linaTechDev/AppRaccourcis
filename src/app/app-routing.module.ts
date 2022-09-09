import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RedirectConnexionComponent} from "./compte/redirection/redirectConnexion.component";
import {AccueilComponent} from "./accueil";

const compteModule = () => import('./compte/compte.module').then(x => x.CompteModule);

const routes: Routes = [
  { path: '', component: AccueilComponent, canActivate: [RedirectConnexionComponent] },
  { path: 'compte', loadChildren: compteModule },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
