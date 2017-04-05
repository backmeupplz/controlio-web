import { NgModule, ModuleWithProviders } from '@angular/core';
import { ErrorHandlerService } from './ErrorHandler.service';
@NgModule({
      imports: [],
      exports: [],
      declarations: []
})
export class ErrorHandlerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ErrorHandlerModule,
      providers: [ErrorHandlerService]
    }
  }
}
