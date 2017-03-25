import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard, AuthModule } from '../auth';

import { Plans } from './Plans';
import { Cards, Stripe } from './Source';
import { PaymentsService } from './PaymentsServices';
import { FormHelperModule } from '../FormHelper';

const moduleRoutes: Routes = [
  { path: 'cards', component: Cards, canActivate: [LoggedInGuard] },
  { path: 'plans', component: Plans, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FormHelperModule,
    RouterModule.forRoot(moduleRoutes)
  ],
  exports: [Cards, Stripe],
  declarations: [Cards, Stripe, Plans],
  providers: [PaymentsService],
})
export class PaymentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PaymentsModule,
      // providers: [PostService]
    }
  }
}
