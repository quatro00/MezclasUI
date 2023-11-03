import { CanActivateFn } from '@angular/router';

export const authSupervisorGuard: CanActivateFn = (route, state) => {
  return true;
};
