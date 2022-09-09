import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from "../../../environments/environment";
import {Utilisateur} from "../../model/Utilisateur";
import { HttpClient } from '@angular/common/http';
import {ServiceComponent} from "../service/service.component";
import {first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'creation.component.html',
  styleUrls: ['creation.component.css']
})
export class CreationComponent implements OnInit {
  utilisateur!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private service: ServiceComponent,
    private router: Router
  ) { }

  ngOnInit() {
    this.utilisateur = this.formBuilder.group({
      prenom: ['', Validators.required],
      nomFamille: ['', Validators.required],
      nomUtilisateur: ['', Validators.required],
      motPasse: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.utilisateur.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.utilisateur.invalid) {
      return;
    }

    this.loading = true;
    this.service.creation(this.utilisateur.value)
      .pipe(first())
      .subscribe(
          (data: any) => {

          console.log('ok:', data);
          this.loading = false;
            this.router.navigate(['/accueil']).then(() => "Erreur");

        },
          (error: any) => {

          console.log('error:', error);
          this.loading = false;
        });

  }
}
