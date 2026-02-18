import { useState } from "react";

import type { Tenant, UpdateTenant } from "@/types/tenant";

import { getAnnualLicenseCost, getCouponDiscount } from "@/api/registrationAPI";

import ConnectCostSummary from "./connectCostSummary";

import { validateNumberOfUserLicenses, validateOrganizationShortName, validatePhoneNumber } from "@/helpers/validators";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ConnectPlanProps = {
    tenant: Tenant,
    updateTenant: UpdateTenant,
    setStep: (step: number) => void
}

export default function ConnectPlan({ 
    tenant, 
    updateTenant, 
    setStep 
}: ConnectPlanProps) {
    const [errors, setErrors] = useState<{ 
        numberOfUserLicensesError: string,
        organizationShortNameError: string,
        contactFirstNameError: string,
        contactLastNameError: string,
        contactPhoneNumberError: string
    }>({
        numberOfUserLicensesError: "",
        organizationShortNameError: "",
        contactFirstNameError: "",
        contactLastNameError: "",
        contactPhoneNumberError: ""
    });

    const MAX_ORG_SHORT_NAME = 12;
    const MIN_ORG_SHORT_NAME = 3;
    const MIN_LICENSES = 500;

    function handleNumberOfUserLicensesChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
        setErrors(prev => ({
            ...prev, 
            numberOfUserLicensesError: ""
        }));
        updateTenant("numberOfUserLicenses", Number(e.target.value));
    }

    function handleContactFirstNameChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
        setErrors(prev => ({
            ...prev, 
            contactFirstNameError: ""
        }));
        updateTenant("contactFirstName", e.target.value);
    }

    function handleContactLastNameChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
        setErrors(prev => ({
            ...prev, 
            contactLastNameErrorE: ""
        }));
        updateTenant("contactLastName", e.target.value);
    }

    function handleContactPhoneNumberChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
        setErrors(prev => ({
            ...prev, 
            contactPhoneNumberError: ""
        }));
        updateTenant("contactPhoneNumber", e.target.value);
    }

    function handleOrganizationShortNameChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
        setErrors(prev => ({
            ...prev, 
            organizationShortNameError: ""
        }));
        updateTenant("organizationShortName", e.target.value);
    }

    async function updateAnnualLicenseCost(){
        const annualLicenseCost = await getAnnualLicenseCost(tenant.numberOfUserLicenses);
        updateTenant("annualLicenseCost", annualLicenseCost);
    }

    async function updateCouponDiscount(){
        const couponDiscount = await getCouponDiscount(tenant.couponCode);
        updateTenant("couponDiscount", couponDiscount);
    }

    async function validateBeforeNext(){
        const newErrors: typeof errors = {
            numberOfUserLicensesError: validateNumberOfUserLicenses(tenant.numberOfUserLicenses, MIN_LICENSES),
            organizationShortNameError: validateOrganizationShortName(tenant.organizationShortName, MIN_ORG_SHORT_NAME, MAX_ORG_SHORT_NAME),
            contactFirstNameError: tenant.contactFirstName ? "" : "Contact first name is required",
            contactLastNameError: tenant.contactLastName ? "" : "Contact last name is required",
            contactPhoneNumberError: validatePhoneNumber(tenant.contactPhoneNumber),
        };
        setErrors(newErrors);
        
        if(Object.values(newErrors).some(error => error !== "")){
            return
        }
        else{
            await updateAnnualLicenseCost(); // Failsafe: always ensure cost is correct before moving to next page
            setStep(3);
        }
    }

    return(
        <div className="flex flex-wrap gap-6 items-stretch p-4">
            {/* Left Column */}
            <div className="flex flex-wrap gap-6 flex-1">
                <Card className="relative mx-auto pt-5 min-w-[400px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Configure Your Connect Plan</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="input-user-licenses">User Licenses</FieldLabel>
                                <Input
                                    id="input-user-licenses"
                                    defaultValue={tenant.numberOfUserLicenses}
                                    type="number"
                                    min={500}
                                    aria-invalid={errors.numberOfUserLicensesError !== ""}
                                    onChange={handleNumberOfUserLicensesChange}
                                    onBlur={updateAnnualLicenseCost} // Update cost after moving out of input box
                                />
                                {errors.numberOfUserLicensesError && <FieldError errors={[{message: errors.numberOfUserLicensesError}]} />}
                                <FieldDescription>
                                    Minimum licenses: {MIN_LICENSES}
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-coupon-code">Coupon Code</FieldLabel>
                                <Input
                                    id="input-coupon-code"
                                    defaultValue={tenant.couponCode}
                                    type="text"
                                    onChange={event => updateTenant("couponCode", event.target.value)}
                                    required
                                />
                            </Field>
                            <Button type="button" onClick={updateCouponDiscount} disabled={!tenant.couponCode}>
                                Apply Code
                            </Button>
                        </FieldGroup>
                    </CardContent>
                </Card>

                <Card className="relative mx-auto pt-5 flex-1 min-w-[400px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Customer Information</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <FieldGroup>
                            {/* Organization name is readonly - edit on previous page */}
                            <Field>
                                <FieldLabel htmlFor="input-organization-name">Organization</FieldLabel>
                                <span className="inline-block w-fit"></span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Input
                                            id="input-organization-name"
                                            className="opacity-50 cursor-not-allowed"
                                            value={tenant.organizationName}
                                            type="text"
                                            readOnly={true}
                                            required
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit organization name on previous page</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-organization-short-name">Organization Short Name</FieldLabel>
                                <Input
                                    id="input-organization-short-name" 
                                    value={tenant.organizationShortName} 
                                    type="text"
                                    required
                                    minLength={MIN_ORG_SHORT_NAME}
                                    maxLength={MAX_ORG_SHORT_NAME}
                                    aria-invalid={errors.organizationShortNameError !== ""}
                                    onChange={handleOrganizationShortNameChange} 
                                />
                                {errors.organizationShortNameError && <FieldError errors={[{message: errors.organizationShortNameError}]} />}
                                <FieldDescription>
                                    Short Name must be {MAX_ORG_SHORT_NAME} letters or less to be used in member registration and site access
                                </FieldDescription>
                            </Field>

                            {/* Email Address is readonly - edit on previous page */}
                            <Field>
                                <FieldLabel htmlFor="input-contact-email-address">Email Address</FieldLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Input
                                            id="input-contact-email-address"
                                            className="opacity-50 cursor-not-allowed"
                                            defaultValue={tenant.contactEmailAddress}
                                            type="text"
                                            required
                                            readOnly={true}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit email on previous page</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-contact-first-name">Primary Contact First Name</FieldLabel>
                                <Input
                                    id="input-contact-first-name"
                                    defaultValue={tenant.contactFirstName}
                                    type="text"
                                    required
                                    aria-invalid={errors.contactFirstNameError !== ""}
                                    onChange={handleContactFirstNameChange}
                                />
                                {errors.contactFirstNameError && <FieldError errors={[{message: errors.contactFirstNameError}]} />}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-contact-last-name">Primary Contact Last Name</FieldLabel>
                                <Input
                                    id="input-contact-last-name"
                                    defaultValue={tenant.contactLastName}
                                    type="text"
                                    required
                                    aria-invalid={errors.contactLastNameError !== ""}
                                    onChange={handleContactLastNameChange}
                                />
                                {errors.contactLastNameError && <FieldError errors={[{message: errors.contactLastNameError}]} />}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-contact-last-name">Primary Contact Phone Number</FieldLabel>
                                <Input
                                    id="input-contact-last-name" 
                                    defaultValue={tenant.contactPhoneNumber}
                                    type="tel"
                                    required
                                    aria-invalid={errors.contactPhoneNumberError !== ""}
                                    onChange={handleContactPhoneNumberChange}
                                />
                                {errors.contactPhoneNumberError && <FieldError errors={[{message: errors.contactPhoneNumberError}]} />}
                            </Field>
                        </FieldGroup>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button type="button" onClick={() => setStep(1)}>Back</Button>
                        <Button type="button" onClick={validateBeforeNext}>Continue To Payment</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Right Column */}
            <ConnectCostSummary annualLicenseCost={tenant.annualLicenseCost} couponDiscount={tenant.couponDiscount} />
        </div>
    )
}