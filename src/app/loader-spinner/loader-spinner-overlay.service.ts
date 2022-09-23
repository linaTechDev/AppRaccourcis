import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {LoaderSpinnerComponent} from "./loader-spinner.component";

@Injectable({
  providedIn: 'root'
})
export class LoaderSpinnerOverlayService {
  private overlayRef?: OverlayRef | null;

  constructor(private overlay: Overlay) {
    this.overlayRef = null;
  }

  show(loading: boolean, url: string, message?: string): void {
    if (loading) {
      if ((this.overlayRef == undefined) || (this.overlayRef == null)) {
        this.overlayRef = this.overlay.create();
        const spinnerOverlayPortal = new ComponentPortal(LoaderSpinnerComponent);

        // utilise setTimeout pour éviter l'erreur ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          if ((this.overlayRef !== undefined) && (this.overlayRef !== null)) {
            const component = this.overlayRef.attach(spinnerOverlayPortal);

            component.instance.message = message + ' ' + url;
            component.instance.showSpinner = true;
          }
        });
      }
    } else {
      if ((this.overlayRef !== undefined) && (this.overlayRef !== null)) {
        this.overlayRef.dispose();
        this.overlayRef = null;
      }
    }
  }

}
