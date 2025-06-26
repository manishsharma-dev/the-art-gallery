import { inject } from '@angular/core';
import {  HttpRequest,  HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../services/admin/loader-service';


export function LoaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loaderService: LoaderService = inject(LoaderService);
    loaderService.show(); // Show loader on request start
    return next(req).pipe(
      finalize(() => loaderService.hide()) // Hide loader on request completion
    );
  }
