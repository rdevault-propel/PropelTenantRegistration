// Types
import type { Tenant, UpdateTenant } from "@/types/tenant";

// UI
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
    tenant: Tenant,
    updateTenant: UpdateTenant
}

export default function ConnectSignup({ tenant, updateTenant }: Props): React.ReactElement{
    function beginSignup(){
        console.log("Beginning Signup")
    }

    return(
        <Card className="relative mx-auto w-full max-w-sm pt-5">
            <CardContent>
                <Field>
                    <FieldLabel htmlFor="input-organization-name">Organization</FieldLabel>
                    <Input 
                        id="input-organization-name" 
                        value={tenant.organizationName} 
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
                        value={tenant.contactEmailAddress} 
                        type="email"
                        onChange={event => updateTenant("contactEmailAddress", event.target.value)}
                    />
                    <FieldDescription>
                        This should be the email address of the primary contact who will administer the organization in Connect
                    </FieldDescription>
                </Field>
                <CardFooter>
                    <Button className="w-full" type="button" onClick={beginSignup}>
                        Begin Signup
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    )
}