import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Service } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ServicesOverview() {
  const { t } = useLanguage();
  
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
  
  // Filter only featured services
  const featuredServices = services.filter(service => service.featured).slice(0, 3);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-28 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary">
          {t("home.services_title")}
        </h2>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          {t("home.services_subtitle")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredServices.map(service => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-start">
                {service.imageUrl && (
                  <div className="mr-3">
                    <div 
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10"
                      style={{ 
                        backgroundImage: service.imageUrl ? `url(${service.imageUrl})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </div>
                )}
                <h3 className="text-xl font-medium">{service.title}</h3>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground">
                {service.description}
              </p>
              
              {(service.dayOfWeek || service.time) && (
                <div className="mt-4 text-sm">
                  {service.dayOfWeek && (
                    <div className="flex justify-between">
                      <span className="font-medium">{t("services.day")}:</span>
                      <span>{service.dayOfWeek}</span>
                    </div>
                  )}
                  
                  {service.time && (
                    <div className="flex justify-between mt-1">
                      <span className="font-medium">{t("services.time")}:</span>
                      <span>{service.time}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/services">
                  {t("home.learn_more")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button asChild variant="outline">
          <Link href="/services" className="inline-flex items-center">
            {t("home.view_all_events")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
