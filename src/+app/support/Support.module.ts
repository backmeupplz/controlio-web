import { NgModule } from '@angular/core';
import { SupportComponent }   from './support.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthServiceModule, LoggedInGuard } from '../auth';
const moduleRoutes: Routes = [
  { path: 'support', component: SupportComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [
    AuthServiceModule,
    RouterModule.forRoot(moduleRoutes)
  ],
  exports: [],
  declarations: [SupportComponent],
  providers: [],
})
export class SupportModule {  }
