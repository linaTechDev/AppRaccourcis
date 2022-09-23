import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs";
import {ServiceComponent} from "../service/service.component";
import {CurrentUser} from "../../model/Utilisateur";

@Component({
  templateUrl: 'connexion.component.html',
  styleUrls: ['connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  utilisateur!: FormGroup;
  submitted = false;
  returnUrl!: string;
  errorMessage!: string;
  currentUser! : CurrentUser;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceComponent
  ) { }

  ngOnInit() {
    this.utilisateur = this.formBuilder.group({
      nomUtilisateur: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      motPasse: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]]
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

    this.service.connexion(this.utilisateur.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.currentUser = {
            token: data.token,
            prenom:  data.prenom,
            nomFamille: data.nomFamille,
            nomUtilisateur: data.nomUtilisateur
          }

          console.log('success:', this.currentUser);
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.router.navigate(['/accueil']).then(() => "Erreur");
        },
        (error: any) => {

          console.log('error:', error);
          this.errorMessage = error.error;
        });
  }
}
