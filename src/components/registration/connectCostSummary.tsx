// UI
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

type Props = {
    annualLicenseCost: number,
    couponDiscount: number
}

export default function ConnectCostSummary({ annualLicenseCost, couponDiscount }: Props): React.ReactElement{
    return (
        <>
            <Separator orientation="vertical"/>
            <Card>
                <div>
                    User Licenses: ${annualLicenseCost}
                </div>
                <div>
                    Less Coupon: ${couponDiscount}
                </div>
                <div>
                    Totay's Total: ${annualLicenseCost - couponDiscount}
                </div>
            </Card>
        </>
    );
}