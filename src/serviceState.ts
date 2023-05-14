import { ServiceType } from ".";
import { Service, ServiceCreator } from "./services";

class ServiceState {
    selectedRealServices: Service[] = []
    serviceCreator: ServiceCreator = new ServiceCreator();

    setInitialState(selectedServices: ServiceType[]) {
        this.selectedRealServices.length = 0;
        selectedServices.forEach(selectedService => {
            this.selectedRealServices.push(this.serviceCreator.factoryMethod(selectedService));
        });
        this.validateServiceRelations();
    }

    selectService(selectedService: ServiceType) {
        if (selectedService != null)
            if (!this.selectedRealServices.some(e => e.serviceType === selectedService)) {
                this.selectedRealServices.push(this.serviceCreator.factoryMethod(selectedService));
                this.validateServiceRelations();
            }
    }

    deselectService(deselectedService: ServiceType) {
        if (this.selectedRealServices.some(e => e.serviceType === deselectedService) && deselectedService != null)
            this.serviceDeselection(deselectedService);
    }

    serviceDeselection(deselectedService: ServiceType) {
        this.selectedRealServices = this.selectedRealServices.filter(s => s.serviceType !== deselectedService);
        this.validateServiceRelations();
    }

    getSelectedServicesList(): ServiceType[] {
        return this.selectedRealServices.map((service) => service.serviceType);
    }

    validateServiceRelations() {
        this.selectedRealServices = this.selectedRealServices.filter(service => {
            if (service.requiredRelatedServices?.length > 0) {
                return this.selectedRealServices.some((otherServices) => service.requiredRelatedServices?.includes(otherServices.serviceType));
            }
            return true;
        });
    }
}

const state = new ServiceState();
export { state }