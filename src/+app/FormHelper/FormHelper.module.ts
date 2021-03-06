import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './ErrorMessage';
import { InvalidErrorMessageComponent } from './InvalidMessage';
import { PasswordIndicatorComponent } from './PasswordIndicator';
import { EmailComponent, TagInputComponent, TagInputItemComponent } from './Email';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { BemModule } from 'angular-bem';

import { SelectUser } from './SelectUser';
import { OffClickDirective, HighlightPipe, SelectComponent } from 'ng2-select';
import { DropDownModule } from '../Navigation/DropDownList';
import { LimitInput } from './LimitInput';
import { ButtonComponent } from './Button/Button.component';
import { FHSelect } from './SelectDropDown';

@NgModule({
      imports: [CommonModule, FormsModule,  ReactiveFormsModule, BemModule, DropDownModule],
      exports: [
        ErrorMessageComponent,
        InvalidErrorMessageComponent,
        PasswordIndicatorComponent,
        EmailComponent,
        SelectUser,
        LimitInput,
        ButtonComponent,
        FHSelect
      ],
      declarations: [
        SelectComponent,
        OffClickDirective,
        HighlightPipe,
        ErrorMessageComponent,
        InvalidErrorMessageComponent,
        PasswordIndicatorComponent,
        EmailComponent, TagInputComponent, TagInputItemComponent,
        SelectUser,
        LimitInput,
        ButtonComponent,
        FHSelect
      ],
      providers: [],
})
export class FormHelperModule {}
