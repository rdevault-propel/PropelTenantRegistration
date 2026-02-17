export function getCouponDiscount(couponCode: string){
    // Fake test code
    return couponCode?.includes("off")
        ? 100
        : 0;
}

export function getAnnualLicenseCost(numberOfLicenses: number){
    // Fake test code
    const MIN_LICENSES = 500;
    const ANNUAL_COST_PER_LICENSE = 10;

    return numberOfLicenses > MIN_LICENSES
        ? numberOfLicenses * ANNUAL_COST_PER_LICENSE
        : MIN_LICENSES * ANNUAL_COST_PER_LICENSE;
}
