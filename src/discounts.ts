import { ServiceType, ServiceYear } from ".";
import { Service } from "./services";

export interface Discount {
    discountAmountPerYear: { [year in ServiceYear]: number };
    appliedServiece: ServiceType;
    requiredServices: ServiceType[];
}

export const GetSumOfServicePackageDiscountAmount = (selectedServices: Array<Service>, selectedYear: ServiceYear): number => {
    const discounts: Array<Discount> = [new PhotoVideoPackage()];
    const possibleDiscounts = new Array<Discount>();
    discounts.forEach(discount => {
        if (selectedServices.some((service) => service.serviceType === discount.appliedServiece)
            && selectedServices.some((service) => discount.requiredServices.includes(service.serviceType)))
            possibleDiscounts.push(discount);
    });
    const sumDiscountAmount: number = possibleDiscounts.length > 0 ? possibleDiscounts.reduce((acc, obj) => acc + obj.discountAmountPerYear[selectedYear], 0) : 0;

    return sumDiscountAmount;
}

export const GetBestDiscountAmount = (selectedServices: Array<Service>, selectedYear: ServiceYear): number => {
    const discounts: Array<Discount> = [new SessionInPackage(), new SessionInPackage2020()];
    const possibleDiscounts = new Array<Discount>();
    discounts.forEach(discount => {
        if (selectedServices.some((service) => service.serviceType === discount.appliedServiece)
            && selectedServices.some((service) => discount.requiredServices.includes(service.serviceType)))
            possibleDiscounts.push(discount);
    });
    const bestDiscountAmount: number = possibleDiscounts.length > 0 ? possibleDiscounts.reduce((prev, curr) => {
        return (prev.discountAmountPerYear[selectedYear] > curr.discountAmountPerYear[selectedYear]) ? prev : curr;
    }).discountAmountPerYear[selectedYear] : 0;

    return bestDiscountAmount;
}

class PhotoVideoPackage implements Discount {
    appliedServiece: ServiceType = "VideoRecording";
    requiredServices: ServiceType[] = ["Photography"];
    discountAmountPerYear: { [year in ServiceYear]: number } = {
        2020: 1200,
        2021: 1300,
        2022: 1300,
    }
}

class SessionInPackage implements Discount {
    appliedServiece: ServiceType = "WeddingSession";
    requiredServices: ServiceType[] = ["Photography", "VideoRecording"];
    discountAmountPerYear: { [year in ServiceYear]: number } = {
        2020: 300,
        2021: 300,
        2022: 300,
    }
}

class SessionInPackage2020 implements Discount {
    appliedServiece: ServiceType = "WeddingSession";
    requiredServices: ServiceType[] = ["Photography"];
    discountAmountPerYear: { [year in ServiceYear]: number } = {
        2020: 0,
        2021: 0,
        2022: 600,
    }
}

