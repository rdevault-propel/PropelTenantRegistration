import { useState } from "react";

import type { Tenant, UpdateTenant } from "@/types/tenant";

import { validateEmailAddress } from "@/helpers/validators";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type ConnectSignupProps = {
    tenant: Tenant,
    updateTenant: UpdateTenant
    setStep: (step: number) => void
}

export default function ConnectSignup({ 
    tenant, 
    updateTenant, 
    setStep 
}: ConnectSignupProps) {
    const [errors, setErrors] = useState<{ 
            organizationNameError: string,
            contactEmailAddressError: string,
        }>({
            organizationNameError: "",
            contactEmailAddressError: "",
        });

    function handleContactEmailAddressChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
        setErrors(prev => ({
            ...prev, 
            contactEmailAddressError: ""
        }));
        updateTenant("contactEmailAddress", e.target.value);
    }

    function handleOrganizationNameChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
        setErrors(prev => ({
            ...prev, 
            organizationNameError: ""
        }));
        updateTenant("organizationName", e.target.value);
    }

    function validateBeforeNext(){
        const newErrors: typeof errors = {
            organizationNameError: tenant.organizationName ? "" : "Organization name is required",
            contactEmailAddressError: validateEmailAddress(tenant.contactEmailAddress),
        };
        setErrors(newErrors);
        
        if(Object.values(newErrors).some(error => error !== "")){
            return
        }
        else{
            setStep(2);
        }
    }

    return(
        <Card className="relative mx-auto w-full max-w-sm p-4">
            <CardHeader>
                <CardTitle className="text-2xl">Connect Platform Signup</CardTitle>
            </CardHeader>

            <CardContent>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="input-organization-name">Organization</FieldLabel>
                        <FieldDescription>
                            Name of the organization signing up.
                        </FieldDescription>
                        <Input 
                            id="input-organization-name" 
                            defaultValue={tenant.organizationName} 
                            type="text"
                            required
                            aria-invalid={errors.organizationNameError !== ""}
                            onChange={handleOrganizationNameChange}
                        />
                        {errors.organizationNameError && <FieldError errors={[{message: errors.organizationNameError}]} />}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="input-contact-email-address">Email Address</FieldLabel>
                        <FieldDescription>
                            Primary contact who will administer the organization in Connect
                        </FieldDescription>
                        <Input 
                            id="input-contact-email-address" 
                            defaultValue={tenant.contactEmailAddress} 
                            type="email"
                            required
                            aria-invalid={errors.contactEmailAddressError !== ""}
                            onChange={handleContactEmailAddressChange}
                        />
                        {errors.contactEmailAddressError && <FieldError errors={[{message: errors.contactEmailAddressError}]} />}
                    </Field>
                </FieldGroup>
            </CardContent>

            <CardFooter>
                <Button 
                    type="button"
                    disabled={!tenant.organizationName || !tenant.contactEmailAddress} 
                    onClick={validateBeforeNext}>
                    Begin Signup
                </Button>
            </CardFooter>
        </Card>
    )
}