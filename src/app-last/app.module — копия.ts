import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [ AppComponent ],
  imports: [SharedModule]
})
export class AppModule {
}

export { AppComponent } from './app.component';
