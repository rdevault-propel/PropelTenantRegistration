// Types
import type { Tenant } from "@/types/tenant";

// Components
import ConnectCostSummary from "./connectCostSummary";

// UI
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";


type Props = {
    tenant: Tenant,
    goToStep: (step: number) => void
}

export default function ConnectBilling({ tenant, goToStep }: Props): React.ReactElement{
    return(
        <>
            <Card className="relative mx-auto w-full max-w-sm pt-5">
                <CardContent>
                    TODO: USE MAXIO's UI FOR BILLING
                </CardContent>
                <CardFooter>
                    <Button type="button" onClick={() => goToStep(2)}>Back</Button>
                </CardFooter>
            </Card>

            <ConnectCostSummary annualLicenseCost={tenant.annualLicenseCost} couponDiscount={tenant.couponDiscount} />
        </>
    )
}