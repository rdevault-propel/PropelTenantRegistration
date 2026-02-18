import { formatNumber } from "@/helpers/formatters";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ConnectCostSummaryProps = {
    annualLicenseCost: number,
    couponDiscount: number
}

export default function ConnectCostSummary({ annualLicenseCost, couponDiscount }: ConnectCostSummaryProps): React.ReactElement{
    return (
        <Card className="relative mx-auto w-100 flex-none self-stretch p-4">
            <CardHeader>
                <CardTitle className="text-2xl">Plan Summary</CardTitle>
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