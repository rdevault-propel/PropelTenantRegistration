// Helpers
import { formatNumber } from "@/helpers/formatter";

// UI
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
    annualLicenseCost: number,
    couponDiscount: number
}

export default function ConnectCostSummary({ annualLicenseCost, couponDiscount }: Props): React.ReactElement{
    return (
        <Card className="relative mx-auto w-100 pt-5 flex-none self-stretch">
            <CardHeader>
                <CardTitle>Configure Your Connect Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 w-64">
                    <div className="flex justify-between">
                        <span>User Licenses:</span>
                        <span>${formatNumber(annualLicenseCost)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Less Coupon:</span>
                        <span className="border-b border-black pb-1">-${formatNumber(couponDiscount)}</span>
                    </div>

                    <div className="flex justify-between font-semibold">
                        <span>Today's Total:</span>
                        <span>${formatNumber(annualLicenseCost - couponDiscount)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}