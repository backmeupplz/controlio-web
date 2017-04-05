import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppHeaders } from './AppHeaders.service';
import { AppHttp } from './AppHttp.service';
import { ErrorHandlerModule } from '../ErrorHandler';

@NgModule({
      imports: [ErrorHandlerModule.forRoot()],
      exports: [],
      declarations: [],
})
export class HTTPHelperModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HTTPHelperModule,
      providers: [AppHeaders, AppHttp]
    }
  }
}
