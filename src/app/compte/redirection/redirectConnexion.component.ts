import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ServiceComponent} from "../service/service.component";

@Injectable({ providedIn: 'root' })
export class RedirectConnexionComponent implements CanActivate {
  constructor(
    private router: Router,
    private serviceComponent: ServiceComponent
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.serviceComponent.isConnected()) {
      return true;
    }

    this.router.navigate(['/compte/connexion'], {queryParams: {returnUrl: state.url}}).then(() => "Erreur");
    return false;
  }
}
