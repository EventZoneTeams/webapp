import {BackEndEventPackage, BackEndProductInPackage, EventPackage, ProductInPackage} from "@/types/event-packages.";
import {mapBackEndEventProductToEventProduct} from "@/lib/event-product";

export const mapBackEndProductInPackageToProductInPackage = (data: BackEndProductInPackage): ProductInPackage => {
    return {
        productId: data["product-id"],
        packageId: data["package-id"],
        quantity: data.quantity,
        eventProduct: mapBackEndEventProductToEventProduct(data["event-product"])
    }
}

export const mapBackEndProductsInPackageToProductsInPackage = (data: BackEndProductInPackage[]): ProductInPackage[] => {
    return data.map(mapBackEndProductInPackageToProductInPackage);
}

export const mapBackEndEventPackageToEventPackage = (data: BackEndEventPackage): EventPackage => {
    return {
        id: data.id,
        eventId: data["event-id"],
        imageUrl: data["image-url"],
        totalPrice: data["total-price"],
        description: data.description,
        thumbnailUrl: data["thumbnail-url"],
        isDeleted: data["is-deleted"],
        productsInPackage: mapBackEndProductsInPackageToProductsInPackage(data["products-in-package"])
    }
}

export const mapBackEndEventPackagesToEventPackages = (data: BackEndEventPackage[]): EventPackage[] => {
    return data.map(mapBackEndEventPackageToEventPackage);
}