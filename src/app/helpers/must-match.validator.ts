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
        // if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        //     return;
        // }

        // if (control.value !== matchingControl.value) {
        //     matchingControl.setErrors({ mustMatch: true });
        // } else {
        //     matchingControl.setErrors(null);
        // }
    };
}
