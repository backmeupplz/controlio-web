import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../auth';

const moduleRoutes: Routes = [
  //{ path: 'cards', component: Cards, canActivate: [LoggedInGuard] },
  //{ path: 'plans', component: Plans, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(moduleRoutes)
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class PaymentsModule {}
