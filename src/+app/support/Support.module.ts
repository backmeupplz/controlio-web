import { NgModule } from '@angular/core';
import { SupportComponent }   from './support.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthServiceModule, LoggedInGuard } from '../auth';
import { ImageModule } from '../Image';

const moduleRoutes: Routes = [
  { path: 'support', component: SupportComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [
    ImageModule,
    AuthServiceModule,
    RouterModule.forRoot(moduleRoutes)
  ],
  exports: [],
  declarations: [SupportComponent],
  providers: [],
})
export class SupportModule {  }
