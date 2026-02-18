export function validateEmailAddress(emailAddress: string): string {
    // Basic RFC 5322 email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddress.trim())
        ? ""
        : "Invalid email address";
}

export function validateNumberOfUserLicenses(numberOfUserLicenses: number, min?: number){
    if(numberOfUserLicenses === undefined || numberOfUserLicenses === null || isNaN(numberOfUserLicenses)) return "Please enter a number";
    else if(min && numberOfUserLicenses < min) return `Minimum licenses: ${min}`
    return "";
}
export function validateOrganizationShortName(organizationShortName: string, min?: number, max?: number){
    if(!organizationShortName) return "Required";
    else if(min && organizationShortName.length < min) return `Short name must be ${min} letters or more`
    else if(max && organizationShortName.length > max) return `Short name must be ${max} letters or less`;
    return "";
}

export function validatePhoneNumber(phoneNumber: string): string {
    // Basic US/Intl phone regex, allows digits, spaces, +, -, ()
    const re = /^\+?[\d\s\-()]{7,15}$/;
    return re.test(phoneNumber.trim()) 
        ? "" 
        : "Invalid phone number";
}