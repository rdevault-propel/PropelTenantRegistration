export function validateEmailAddress(emailAddress: string): string {
    console.log(`validateEmailAddress called with: ${emailAddress}`)
    // Basic RFC 5322 email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddress.trim())
        ? ""
        : "Email is invalid";
}

export function validateNumberOfUserLicenses(numberOfUserLicenses: number, min?: number){
    console.log(`validateNumberOfUserLicenses called with: ${numberOfUserLicenses}`)
    if(!numberOfUserLicenses) return "Please enter a number";
    else if(min && numberOfUserLicenses < min) return `Must purchase at least ${min} licenses`
    return "";
}
export function validateOrganizationShortName(organizationShortName: string, min?: number, max?: number){
    console.log(`validateOrganizationShortName called with: ${organizationShortName}`)
    if(!organizationShortName) return "Organization short name is required";
    else if(min && organizationShortName.length < min) return `Short name must be ${min} letters or more`
    else if(max && organizationShortName.length > max) return `Short name must be ${max} letters or less`;
    return "";
}

export function validatePhoneNumber(phoneNumber: string): string {
    console.log(`validatePhoneNumber called with ${phoneNumber}`)
    // Basic US/Intl phone regex, allows digits, spaces, +, -, ()
    const re = /^\+?[\d\s\-()]{7,15}$/;
    return re.test(phoneNumber.trim()) 
        ? "" 
        : "Phone number is invalid";
}