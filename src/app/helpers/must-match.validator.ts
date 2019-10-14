import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): any {
    return (value: boolean) => {
        const control = controlName;
        const matchingControl = matchingControlName;
        if (control === matchingControl) {
            return true;
        } else {
            return false;
        }
    };
}
