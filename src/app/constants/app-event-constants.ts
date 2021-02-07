import { ValidatorFn, Validators } from "@angular/forms";

export class AppEventConstants{
    public static appEventNameValidators: ValidatorFn[] = [Validators.required, Validators.minLength(1), Validators.maxLength(20)];
    public static appEventDescriptionValidators: ValidatorFn[] = [Validators.maxLength(150)];
    public static contactsValidators: ValidatorFn[] = [Validators.required];
    public static readonly dateAndTimeValidators: ValidatorFn[] = [Validators.required, Validators.minLength(1)];
    public static readonly maxAttendeesValidators: ValidatorFn[] = [Validators.min(2), Validators.max(999)];
    
    public static appEventNameMessage: string = 'Vul een naam in van max 20 tekens.';
    public static appEventDescriptionMessage: string = 'Maximale lengte is 150 tekens.';
    public static contactsMessage: string = 'Voeg minstens één contact toe.';
    public static dateTimeMessage: string = 'Vul een datum en een tijd in.';
    public static dateMessage: string = 'Vul een datum in.';
    public static timeMessage: string = 'Vul een tijd in.';
    public static maxAttendeesMessage: string = 'Tussen 2 en 999.';

    public static appEventNameStyling = {'font-size': '32px', 'font-weight': '500'};
}