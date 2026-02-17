export function formatNumber(
    number: number, 
    locale: string = "en-US",
    minDigits: number = 2, 
    maxDigits: number = 2
){
    return new Intl.NumberFormat(locale, {
            style: "decimal",
            minimumFractionDigits: minDigits,
            maximumFractionDigits: maxDigits,
    }).format(number);
}