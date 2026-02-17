// Types
import type { Tenant, UpdateTenant } from "@/types/tenant";

// API
import { getAnnualLicenseCost, getCouponDiscount } from "@/api/registrationAPI";

// Components
import ConnectCostSummary from "./connectCostSummary";

// UI
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
    tenant: Tenant,
    updateTenant: UpdateTenant
}

export default function ConnectPlan({ tenant, updateTenant }: Props): React.ReactElement{
    const MIN_LICENSES = 500;

    const updateAnnualLicenseCost = () =>{
        const annualLicenseCost = getAnnualLicenseCost(tenant.numberOfUserLicenses);
        updateTenant("annualLicenseCost", annualLicenseCost);
    }

    const updateCouponDiscount = () => {
        const couponDiscount = getCouponDiscount(tenant.couponCode);
        updateTenant("couponDiscount", couponDiscount);
    }

    function continueToPayment(){
        console.log("Continuing to payment")
    }

    return(
        <>
            <div>
                <Card>
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
                    </FieldGroup>

                    <FieldGroup>
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
                </Card>

                <Card>
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
                    </FieldGroup>

                    {/* Primary Contact */}
                    <FieldGroup>
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
                </Card>
                <Button onClick={continueToPayment}>Continue To Payment</Button>
            </div>

            <ConnectCostSummary annualLicenseCost={tenant.annualLicenseCost} couponDiscount={tenant.couponDiscount} />
        </>
    )
}