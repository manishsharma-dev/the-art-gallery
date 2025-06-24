import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../services/admin/loader-service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private loaderService: LoaderService = inject(LoaderService);
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show(); // Show loader on request start
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide()) // Hide loader on request completion
    );
  }
}
