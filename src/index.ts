import { state } from "./serviceState";
import { GetBestDiscountAmount, GetSumOfServicePackageDiscountAmount } from "./discounts";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";



export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    state.setInitialState(previouslySelectedServices);

    if (action.type === "Select")
        state.selectService(action.service);

    if (action.type === "Deselect")
        state.deselectService(action.service)

    return state.getSelectedServicesList();
};


export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    let calculatedBasePrice = 0;
    state.setInitialState(selectedServices);
    state.selectedRealServices.forEach(service => {
        let servicePrice = service.getServicePrice(selectedYear);
        calculatedBasePrice += servicePrice;
    });

    const packageServiceDiscountAmount: number = GetSumOfServicePackageDiscountAmount(state.selectedRealServices, selectedYear);
    const bestDiscountAmount: number = GetBestDiscountAmount(state.selectedRealServices, selectedYear);
    const priceWithDiscount = calculatedBasePrice - packageServiceDiscountAmount - bestDiscountAmount;

    return { basePrice: calculatedBasePrice, finalPrice: priceWithDiscount };
}

