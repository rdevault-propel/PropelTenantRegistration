// Types
import type { Tenant, UpdateTenant } from "@/types/tenant";

// API
import { getAnnualLicenseCost, getCouponDiscount } from "@/api/registrationAPI";

// Components
import ConnectCostSummary from "./connectCostSummary";

// UI
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
    tenant: Tenant,
    updateTenant: UpdateTenant,
    goToStep: (step: number) => void
}

export default function ConnectPlan({ tenant, updateTenant, goToStep }: Props): React.ReactElement{
    const MIN_LICENSES = 500;

    const updateAnnualLicenseCost = () =>{
        const annualLicenseCost = getAnnualLicenseCost(tenant.numberOfUserLicenses);
        updateTenant("annualLicenseCost", annualLicenseCost);
    }

    const updateCouponDiscount = () => {
        const couponDiscount = getCouponDiscount(tenant.couponCode);
        updateTenant("couponDiscount", couponDiscount);
    }

    return(
        <>
            <div>
                <Card className="relative mx-auto w-full max-w-sm pt-5">
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="input-user-licenses">User Licenses</FieldLabel>
                                <Input
                                    id="input-user-licenses" 
                                    value={tenant.numberOfUserLicenses} 
                                    type="number"
                                    min="0"
                                    onChange={event => updateTenant("numberOfUserLicenses", Number(event.target.value))}
                                />
                                <FieldDescription>
                                    Minimum of licenses: {MIN_LICENSES}
                                </FieldDescription>
                            </Field>
                            <Button type="button" onClick={updateAnnualLicenseCost} disabled={!tenant.numberOfUserLicenses}>
                                Update Totals
                            </Button>

                            <Field>
                                <FieldLabel htmlFor="input-coupon-code">Coupon Code</FieldLabel>
                                <Input
                                    id="input-coupon-code" 
                                    value={tenant.couponCode} 
                                    type="text"
                                    onChange={event => updateTenant("couponCode", event.target.value)}
                                />
                            </Field>
                            <Button type="button" onClick={updateCouponDiscount} disabled={!tenant.couponCode}>
                                Apply Code
                            </Button>
                        </FieldGroup>
                    </CardContent>
                </Card>

                <Card className="relative mx-auto w-full max-w-sm pt-5">
                    <CardContent>
                        {/* Organization */}
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="input-organization-name">Organization</FieldLabel>
                                <Input
                                    id="input-organization-name" 
                                    value={tenant.organizationName} 
                                    type="text" 
                                    readOnly={true}
                                    disabled={true}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-organization-short-name">Organization Short Name</FieldLabel>
                                <Input
                                    id="input-organization-short-name" 
                                    value={tenant.organizationShortName} 
                                    type="text"
                                    onChange={event => updateTenant("organizationShortName", event.target.value)} />
                                <FieldDescription>
                                    Short Name must be 12 letters or less to be used in member registration and site access
                                </FieldDescription>
                            </Field>

                        {/* Primary Contact */}
                            <Field>
                                <FieldLabel htmlFor="input-contact-email-address">Email Address</FieldLabel>
                                <Input
                                    id="input-contact-email-address" 
                                    value={tenant.contactEmailAddress} 
                                    type="text" 
                                    readOnly={true}
                                    disabled={true}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-contact-first-name">Primary Contact First Name</FieldLabel>
                                <Input
                                    id="input-contact-first-name" 
                                    value={tenant.contactFirstName} 
                                    type="text" 
                                    onChange={event => updateTenant("contactFirstName", event.target.value)}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-contact-last-name">Primary Contact Last Name</FieldLabel>
                                <Input
                                    id="input-contact-last-name" 
                                    value={tenant.contactLastName} 
                                    type="text" 
                                    onChange={event => updateTenant("contactLastName", event.target.value)}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="input-contact-last-name">Primary Contact Phone Number</FieldLabel>
                                <Input
                                    id="input-contact-last-name" 
                                    value={tenant.contactPhoneNumber} 
                                    type="tel" 
                                    onChange={event => updateTenant("contactPhoneNumber", event.target.value)}
                                />
                            </Field>
                        </FieldGroup>
                    </CardContent>
                    <CardFooter>
                        <Button type="button" onClick={() => goToStep(1)}>Back</Button>
                        <Button type="button" onClick={() => goToStep(3)}>Continue To Payment</Button>
                    </CardFooter>
                </Card>
            </div>

            <ConnectCostSummary annualLicenseCost={tenant.annualLicenseCost} couponDiscount={tenant.couponDiscount} />
        </>
    )
}