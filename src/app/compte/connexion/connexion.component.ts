import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs";
import {environment} from "../../../environments/environment";
import {Utilisateur} from "../../model/Utilisateur";
import { HttpClient } from '@angular/common/http';
import {ServiceComponent} from "../service/service.component";

@Component({
  templateUrl: 'connexion.component.html',
  styleUrls: ['connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  utilisateur!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceComponent
  ) { }

  ngOnInit() {
    this.utilisateur = this.formBuilder.group({
      nomUtilisateur: ['', Validators.required],
      motPasse: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    this.service.connexion(this.utilisateur.value)
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
