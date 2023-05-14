import { ServiceType, ServiceYear } from ".";

export class ServiceCreator {
    public factoryMethod(serviceType: ServiceType): Service {
        switch (serviceType) {
            case "Photography":
                return new PhotographyService();
            case "VideoRecording":
                return new VideoRecordingService();
            case "BlurayPackage":
                return new BlurayPackageService();
            case "TwoDayEvent":
                return new TwoDayEventService();
            case "WeddingSession":
                return new WeddingSessionService();
        }
    }
}

export interface Service {
    prices: { [year in ServiceYear]: number };
    fixedPrice?: number;
    serviceType: ServiceType;
    getServiceName(): string;
    getServicePrice(year: ServiceYear): number;
    requiredRelatedServices?: ServiceType[];
}

class BaseService implements Service {
    prices: { [year in ServiceYear]: number }
    serviceType: ServiceType;
    fixedPrice?: number;

    public getServiceName(): string {
        return 'base service';
    }

    public getServicePrice(year: ServiceYear): number {
        if (this.prices && this.prices[year])
            return this.prices[year];
        else if (this.fixedPrice)
            return this.fixedPrice;
        else return 0;
    }
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class PhotographyService extends BaseService implements Service {
    serviceType: ServiceType = "Photography";

    prices: { [year in ServiceYear]: number } = {
        2020: 1700,
        2021: 1800,
        2022: 1900,
    }

    public getServiceName(): string {
        return 'photography during the wedding';
    }
}

class VideoRecordingService extends BaseService implements Service {
    serviceType: ServiceType = "VideoRecording";
    prices: { [year in ServiceYear]: number } = {
        2020: 1700,
        2021: 1800,
        2022: 1900,
    }

    public getServiceName(): string {
        return 'video recording during the wedding';
    }
}

class BlurayPackageService extends BaseService implements Service {
    serviceType: ServiceType = "BlurayPackage";
    fixedPrice?: number = 300;
    requiredRelatedServices: ServiceType[] = ["VideoRecording"];


    public getServiceName(): string {
        return 'extra Blu-ray package';
    }
}

class TwoDayEventService extends BaseService implements Service {
    serviceType: ServiceType = "TwoDayEvent";
    fixedPrice?: number = 400;
    requiredRelatedServices: ServiceType[] = ["VideoRecording", "Photography"];

    public getServiceName(): string {
        return 'handling of the two-day event';
    }
}

class WeddingSessionService extends BaseService implements Service {
    serviceType: ServiceType = "WeddingSession";
    fixedPrice?: number = 600;

    public getServiceName(): string {
        return 'wedding session';
    }
}