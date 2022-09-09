import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CompteRoutingModule } from './compte-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { CreationComponent } from './creation/creation.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompteRoutingModule
  ],
  declarations: [
    ConnexionComponent,
    CreationComponent
  ]
})
export class CompteModule { }
