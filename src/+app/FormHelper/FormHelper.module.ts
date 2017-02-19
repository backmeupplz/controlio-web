import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './ErrorMessage';
import { InvalidErrorMessageComponent } from './InvalidMessage';
import { PasswordIndicatorComponent } from './PasswordIndicator';

@NgModule({
      imports: [CommonModule],
      exports: [ErrorMessageComponent, InvalidErrorMessageComponent,
      PasswordIndicatorComponent
      ],
      declarations: [ErrorMessageComponent, InvalidErrorMessageComponent,
      PasswordIndicatorComponent
      ],
      providers: [],
})
export class FormHelperModule {}
