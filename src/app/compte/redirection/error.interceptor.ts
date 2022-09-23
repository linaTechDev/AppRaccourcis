import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import {ServiceComponent} from "../service/service.component";
import {LoaderSpinnerOverlayService} from "../../loader-spinner/loader-spinner-overlay.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private requestCount = 0;

  constructor(
    private serviceComponent: ServiceComponent,
    private spinnerOverlayService: LoaderSpinnerOverlayService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.requestCount === 0) {
      this.spinnerOverlayService.show(true, request.url, "Loading...");
    }
    this.requestCount++;

    return next.handle(request)
      .pipe(catchError(err => {
        if ([401, 403].includes(err.status) && this.serviceComponent.isConnected()) {
          // auto logout si 401 : HttpStatus.UNAUTHORIZED ou 403 : HttpStatus.FORBIDDEN
          this.spinnerOverlayService.show(false, request.url);
          this.serviceComponent.logout();
        }

        this.spinnerOverlayService.show(false, request.url);
        this.requestCount = 0;
        return throwError(err);
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.requestCount--;
          if (this.requestCount <= 0) {
            this.spinnerOverlayService.show(false, request.url);
          }
          if (this.requestCount < 0) {
            this.requestCount = 0;
          }
        }
        return evt;
      }));
  }
}
