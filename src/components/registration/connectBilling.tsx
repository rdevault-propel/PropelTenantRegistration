import type { Tenant } from '@/types/tenant'

import ConnectCostSummary from './connectCostSummary'

import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

type ConnectBillingProps = {
  tenant: Tenant
  setStep: (step: number) => void
}

export default function ConnectBilling({ tenant, setStep }: ConnectBillingProps) {
  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm p-4">
        <CardContent>TODO: USE MAXIO's UI FOR BILLING</CardContent>
        <CardFooter>
          <Button type="button" onClick={() => setStep(2)}>
            Back
          </Button>
        </CardFooter>
      </Card>

      <ConnectCostSummary annualLicenseCost={tenant.annualLicenseCost} couponDiscount={tenant.couponDiscount} />
    </>
  )
}
