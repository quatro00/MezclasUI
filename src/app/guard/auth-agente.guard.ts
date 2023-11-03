import { CanActivateFn } from '@angular/router';

export const authAgenteGuard: CanActivateFn = (route, state) => {
  return true;
};
