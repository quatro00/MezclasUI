import { CanActivateFn } from '@angular/router';

export const authClienteGuard: CanActivateFn = (route, state) => {
  return true;
};
