// Types
import type { Tenant, UpdateTenant } from "@/types/tenant";

// UI
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
    tenant: Tenant,
    updateTenant: UpdateTenant
    goToStep: (step: number) => void
}

export default function ConnectSignup({ tenant, updateTenant, goToStep }: Props): React.ReactElement{
    return(
        <Card className="relative mx-auto w-full max-w-sm pt-5">
            <CardContent>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="input-organization-name">Organization</FieldLabel>
                        <Input 
                            id="input-organization-name" 
                            defaultValue={tenant.organizationName} 
                            type="text"
                            onChange={event => updateTenant("organizationName", event.target.value)}
                        />
                        <FieldDescription>
                            Enter the name of the organization signing up.
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="input-contact-email-address">Email Address</FieldLabel>
                        <Input 
                            id="input-contact-email-address" 
                            defaultValue={tenant.contactEmailAddress} 
                            type="email"
                            onChange={event => updateTenant("contactEmailAddress", event.target.value)}
                        />
                        <FieldDescription>
                            This should be the email address of the primary contact who will administer the organization in Connect
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </CardContent>
            <CardFooter>
                <Button 
                    type="button"
                    disabled={!tenant.organizationName || !tenant.contactEmailAddress} 
                    onClick={() => goToStep(2)}>
                    Begin Signup
                </Button>
            </CardFooter>
        </Card>
    )
}