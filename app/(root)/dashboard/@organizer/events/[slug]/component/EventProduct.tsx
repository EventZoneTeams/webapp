"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { EventProduct as EventProductAPI } from "@/lib/api/event-product";
import {
  EventProduct,
  ProductImage,
  UpdateEventProductRequest,
} from "@/types/event-product";
import { Image as ImageAPI } from "@/lib/api/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

function ImageUpload({
  onImagesSelected,
  existingImages = [],
}: {
  onImagesSelected: (files: File[]) => void;
  existingImages?: File[];
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      onImagesSelected([...existingImages, ...acceptedFiles]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed",
        isDragActive ? "border-primary" : "border-gray-300",
      )}
    >
      <input {...getInputProps()} />
      <ImageIcon className="h-10 w-10 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">
        Drag and drop images here, or click to select files
      </p>
    </div>
  );
}

function NewEventProductDialog({
  onAdd,
  eventId,
}: {
  onAdd: (product: EventProduct) => void;
  eventId: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProduct = async () => {
    setIsLoading(true);
    try {
      const uploadedImageUrls = await Promise.all(
        images.map((image) => ImageAPI.uploadImage(image)),
      );
      const payload = {
        eventId,
        name,
        description,
        price,
        quantityInStock,
        imageUrls: uploadedImageUrls,
      };
      const response = await EventProductAPI.create(payload);
      if (response.isSuccess) {
        const newProduct: EventProduct = {
          id: response?.data?.id,
          eventId,
          name,
          description,
          price,
          quantityInStock,
          productImages: uploadedImageUrls.map((url) => ({
            id: "",
            imageUrl: url,
            name: "",
            isDeleted: false,
          })),
          createdAt: new Date().toISOString(),
          isDeleted: false,
        };
        onAdd(newProduct);
        toast.success("Product created successfully");
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:bg-background/50 hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Event Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-hidden bg-background/50 p-0 backdrop-blur-xl sm:max-w-[700px]">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>New Event Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="grid gap-4 px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantityInStock">Quantity In Stock</Label>
              <Input
                type="number"
                id="quantityInStock"
                placeholder="0"
                value={quantityInStock}
                onChange={(e) => setQuantityInStock(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Product Images</Label>
              <ImageUpload
                onImagesSelected={setImages}
                existingImages={images}
              />
              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="h-20 w-20 rounded-lg object-cover"
                        width={800}
                        height={800}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
        <Button
          className="w-full"
          onClick={handleCreateProduct}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function UpdateEventProductDialog({
  product,
  onUpdate,
}: {
  product: EventProduct;
  onUpdate: (updatedProduct: EventProduct) => void;
}) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price);
  const [quantityInStock, setQuantityInStock] = useState(
    product.quantityInStock,
  );
  const [existingImages, setExistingImages] = useState<ProductImage[]>(
    product.productImages || [],
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProduct = async () => {
    setIsLoading(true);
    try {
      const uploadedImageUrls = await Promise.all(
        newImages.map((image) => ImageAPI.uploadImage(image)),
      );

      const payload: UpdateEventProductRequest = {
        name,
        description,
        price,
        quantityInStock,
        imageUrls: [
          ...existingImages.map((img) => img.imageUrl),
          ...uploadedImageUrls,
        ],
      };

      const response = await EventProductAPI.update(product.id, payload);

      if (response.isSuccess) {
        const updatedProduct: EventProduct = {
          ...product,
          name,
          description,
          price,
          quantityInStock,
          productImages: [
            ...existingImages,
            ...uploadedImageUrls.map((url) => ({
              id: "",
              imageUrl: url,
              name: "",
              isDeleted: false,
            })),
          ],
        };
        onUpdate(updatedProduct);
        toast.success("Product updated successfully");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const removeExistingImage = (imageId: string) => {
    setExistingImages(existingImages.filter((img) => img.id !== imageId));
  };

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  return (
    <DialogContent className="max-h-[95vh] overflow-hidden bg-background/50 p-0 backdrop-blur-xl sm:max-w-[700px]">
      <DialogHeader className="px-6 pt-6">
        <DialogTitle>Update Event Product</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[calc(90vh-120px)]">
        <div className="grid gap-4 px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantityInStock">Quantity In Stock</Label>
            <Input
              type="number"
              id="quantityInStock"
              value={quantityInStock}
              onChange={(e) => setQuantityInStock(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label>Existing Images</Label>
            <div className="flex flex-wrap gap-2">
              {existingImages.map((image) => (
                <div key={image.id} className="relative">
                  <Image
                    src={image.imageUrl}
                    alt={image.name}
                    className="h-20 w-20 rounded-lg object-cover"
                    width={800}
                    height={800}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6"
                    onClick={() => removeExistingImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Add New Images</Label>
            <ImageUpload
              onImagesSelected={(files) =>
                setNewImages([...newImages, ...files])
              }
              existingImages={newImages}
            />
            {newImages.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {newImages.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`New ${index + 1}`}
                      className="h-20 w-20 rounded-lg object-cover"
                      width={800}
                      height={800}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6"
                      onClick={() => removeNewImage(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
      <Button
        className="mt-4 w-full"
        onClick={handleUpdateProduct}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Product"}
      </Button>
    </DialogContent>
  );
}

function ProductItem({
  product,
  onUpdate,
  onDelete,
}: {
  product: EventProduct;
  onUpdate: (updatedProduct: EventProduct) => void;
  onDelete: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.productImages.length,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.productImages.length) %
        product.productImages.length,
    );
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(product.id);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageClick = () => {
    setShowAllImages(true);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {product.productImages.length > 0 && (
                <div className="flex space-x-2">
                  {product.productImages.slice(0, 2).map((image, index) => (
                    <div key={index} className="relative h-24 w-24">
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} - ${index + 1}`}
                        className="cursor-pointer rounded-md object-cover"
                        onClick={() => handleImageClick()}
                        fill
                      />
                    </div>
                  ))}
                  {product.productImages.length > 2 && (
                    <div
                      className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-md"
                      onClick={() => handleImageClick()}
                    >
                      <Image
                        src={product.productImages[2].imageUrl}
                        alt={`${product.name} - 3`}
                        className="object-cover"
                        fill
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <span className="font-semibold text-white">
                          +{product.productImages.length - 2}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.price === 0
                  ? "Free"
                  : `${product.price.toLocaleString()} VND`}
              </p>
              <p className="text-sm text-muted-foreground">{`In Stock: ${product.quantityInStock}`}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex w-full items-center">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </button>
                    </DialogTrigger>
                    <UpdateEventProductDialog
                      product={product}
                      onUpdate={onUpdate}
                    />
                  </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={handleDelete}
                  className="text-destructive focus:text-destructive"
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      {showAllImages && (
        <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="">Product Images</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <div className="h-[400px] w-[400px]">
                <Image
                  src={product.productImages[currentImageIndex].imageUrl}
                  alt={`Product image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              {product.productImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-1 top-1/2 -translate-y-1/2 rounded-md bg-black/50 p-2 text-white hover:bg-black/75"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-black/50 p-2 text-white hover:bg-black/75"
                    onClick={handleNextImage}
                  >
                    <ChevronRight />
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

export default function EventProducts({ eventId }: { eventId: string }) {
  const [products, setProducts] = useState<EventProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await EventProductAPI.getProductsByEventId(eventId);
        if (response.isSuccess && response.data) {
          const filteredProducts = response.data
            .filter((product) => !product.isDeleted)
            .map((product) => ({
              ...product,
              productImages: product.productImages.filter(
                (image) => !image.isDeleted,
              ),
            }));
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [eventId]);

  const handleAddProduct = (newProduct: EventProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: EventProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await EventProductAPI.deleteById(id);
      if (response.isSuccess) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        throw new Error(response.message || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Products</h2>
        <NewEventProductDialog onAdd={handleAddProduct} eventId={eventId} />
      </div>
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No products found. Add a new product to get started.
        </p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
