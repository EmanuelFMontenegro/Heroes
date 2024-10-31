import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../../services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectar el servicio de spinner
  const spinnerService = inject(SpinnerService);

  // Mostrar el spinner antes de realizar la solicitud
  spinnerService.show();

  return next(req).pipe(
    finalize(() => {
      // Ocultar el spinner después de completar la solicitud
      spinnerService.hide();
    })
  );
};
