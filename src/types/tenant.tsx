export type Tenant = {
  contactEmailAddress: string
  contactFirstName: string
  contactLastName: string
  contactPhoneNumber: string
  couponCode: string
  numberOfUserLicenses: number
  organizationName: string
  organizationShortName: string

  annualLicenseCost: number
  couponDiscount: number
}

export type UpdateTenant = <K extends keyof Tenant>(key: K, value: Tenant[K]) => void
