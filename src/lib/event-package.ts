import {BackEndEventPackage, EventPackage} from "@/types/event-packages.";
import {mapBackEndEventProductsToEventProducts} from "@/lib/event-product";

export const mapBackEndEventPackageToEventPackage = (eventPackage: BackEndEventPackage): EventPackage => {
    return {
        Id: eventPackage.id,
        EventId: eventPackage["event-id"],
        ImageUrl: eventPackage["image-url"],
        TotalPrice: eventPackage["total-price"],
        Description: eventPackage.description,
        ThumbnailUrl: eventPackage["thumbnail-url"],
        IsDeleted: eventPackage["is-deleted"],
        ProductsInPackage: mapBackEndEventProductsToEventProducts(eventPackage["products-in-package"]),
    };
}

export const mapBackEndEventPackagesToEventPackages = (eventPackages: BackEndEventPackage[]): EventPackage[] => {
    return eventPackages.map(mapBackEndEventPackageToEventPackage);
}