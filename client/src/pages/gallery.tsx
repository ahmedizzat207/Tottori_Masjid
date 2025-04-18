import { useLanguage } from "@/hooks/use-language";
import PhotoGrid from "@/components/gallery/photo-grid";

export default function Gallery() {
  const { t } = useLanguage();
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("gallery.title")}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("gallery.subtitle")}
          </p>
        </div>
      </div>
      
      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        <PhotoGrid />
        
        {/* Gallery Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Gallery Categories
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-500"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564039232229-15ea4e223a25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-medium">Mosque Interior</h3>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-500"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1619734086067-24bf8889ea7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-medium">Events & Activities</h3>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-500"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542756564-37b9a9e839d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-medium">Community</h3>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-500"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565006447042-867a329bbc66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-medium">Ramadan & Eid</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit Photos Section */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-xl font-medium mb-2">Submit Your Photos</h2>
          <p className="text-muted-foreground mb-4">
            Have photos from our events or activities? Share them with our community!
          </p>
          <div className="flex justify-center">
            <a 
              href="mailto:gallery@tottorimasjid.jp"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Email Your Photos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
