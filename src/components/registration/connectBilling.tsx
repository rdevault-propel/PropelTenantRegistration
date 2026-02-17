// Types
import type { Tenant } from "@/types/tenant";

// UI
import { Card } from "../ui/card";
import ConnectCostSummary from "./connectCostSummary";

type Props = {
    tenant: Tenant,
}

export default function ConnectBilling({ tenant }: Props): React.ReactElement{
    return(
        <>
            <Card>
                TODO: USE MAXIO's UI FOR BILLING
            </Card>

            <ConnectCostSummary annualLicenseCost={tenant.annualLicenseCost} couponDiscount={tenant.couponDiscount} />
        </>
    )
}