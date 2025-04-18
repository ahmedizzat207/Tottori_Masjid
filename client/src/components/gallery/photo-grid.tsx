import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GalleryImage } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/use-language";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PhotoGrid() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });
  
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  const goToNextImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };
  
  const goToPrevImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  // Handle empty state
  if (images.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square overflow-hidden rounded-md cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => openLightbox(image)}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${image.imageUrl})`,
              }}
            />
          </div>
        ))}
      </div>
      
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <>
              <div className="absolute top-4 right-4 z-10">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-black/20 hover:bg-black/40 text-white rounded-full" 
                  onClick={closeLightbox}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="relative aspect-video md:aspect-[16/9] overflow-hidden bg-black flex items-center justify-center">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title} 
                  className="max-h-full max-w-full object-contain"
                />
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                  onClick={goToPrevImage}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                  onClick={goToNextImage}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              
              <DialogHeader className="p-4">
                <DialogTitle>{selectedImage.title}</DialogTitle>
                {selectedImage.description && (
                  <DialogDescription>{selectedImage.description}</DialogDescription>
                )}
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
