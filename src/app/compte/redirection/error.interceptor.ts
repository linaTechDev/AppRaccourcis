import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {ServiceComponent} from "../service/service.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private serviceComponent: ServiceComponent) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.serviceComponent.isConnected()) {
        // auto logout si 401 : HttpStatus.UNAUTHORIZED ou 403 : HttpStatus.FORBIDDEN
        this.serviceComponent.logout();
      }
      return throwError(err);
    }))
  }
}
