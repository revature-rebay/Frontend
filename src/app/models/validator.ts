import { AbstractControl } from "@angular/forms";
export class Validator {
    //personal details
    static isValidFirstName(abstractControl:AbstractControl){

    }
    static isValidLastName(abstractControl:AbstractControl){

    }
    //email must be provided
    static isValidEmail(abstractControl:AbstractControl){

    }

    //optional, if provided must be in correct format
    static isValidPhoneNumber(){}


    //address
    //not empty
    static isValidStreet(){}
    static isValidZipCode(){}

    //payment
    //required
    static isValidCreditCardNum(){}
    static isValidMonth(){}
    static isValidYear(){}
    static isValidSecurityCode(){}
    
}
