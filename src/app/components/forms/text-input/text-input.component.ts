import { ChangeDetectionStrategy, Component, input, Self } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent implements ControlValueAccessor {
  label = input.required<string>();
  type = input.required<string>();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control(): UntypedFormControl {
    return this.ngControl.control as UntypedFormControl;
  }
}
