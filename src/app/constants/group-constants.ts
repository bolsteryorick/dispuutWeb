import { ValidatorFn, Validators } from "@angular/forms";

export class GroupConstants{
    public static groupNameValidators: ValidatorFn[] = [Validators.required, Validators.minLength(1), Validators.maxLength(20)];
    public static groupDescriptionValidators: ValidatorFn[] = [Validators.maxLength(150)];
    public static contactsValidators: ValidatorFn[] = [Validators.required];
    
    public static groupNameMessage: string = 'Vul een naam in van max 20 tekens.';
    public static groupDescriptionMessage: string = 'Maximale lengte is 150 tekens.';
    public static contactsMessage: string = 'Voeg minstens één contact toe.';

    public static groupNameStyling = {'font-size': 'x-large', 'font-weight': '500', 'text-align': 'left'};
    public static groupDescriptionStyling = {'font-size': 'small', 'text-align': 'left'};
    public static groupEventsViewPortStyling = {'height': '80vh', 'overflow-y': 'auto', 'overflow-x': 'hidden', 'max-height': '1500px'};
}

