import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Service } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Services() {
  const { t } = useLanguage();
  
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
  
  // Separate regular services and special programs
  const regularServices = services.filter(service => 
    service.dayOfWeek && service.time
  );
  
  const specialPrograms = services.filter(service => 
    !service.dayOfWeek || !service.time
  );
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("services.title")}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="regular" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="regular">{t("services.regular_services")}</TabsTrigger>
            <TabsTrigger value="special">{t("services.special_programs")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regular">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-24 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : regularServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularServices.map(service => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
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
                        <div>
                          <CardTitle>{service.title}</CardTitle>
                          {(service.dayOfWeek || service.time) && (
                            <CardDescription>
                              {service.dayOfWeek}{service.dayOfWeek && service.time && ' • '}{service.time}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No regular services available at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="special">
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : specialPrograms.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {specialPrograms.map(program => (
                  <AccordionItem key={program.id} value={program.id.toString()}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        {program.imageUrl && (
                          <div 
                            className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-primary/10"
                            style={{ 
                              backgroundImage: program.imageUrl ? `url(${program.imageUrl})` : undefined,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          />
                        )}
                        <span>{program.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2">
                        <p className="text-muted-foreground">{program.description}</p>
                        
                        {(program.dayOfWeek || program.time) && (
                          <div className="mt-4 text-sm bg-primary/5 p-3 rounded-md">
                            {program.dayOfWeek && (
                              <div className="flex justify-between">
                                <span className="font-medium">{t("services.day")}:</span>
                                <span>{program.dayOfWeek}</span>
                              </div>
                            )}
                            
                            {program.time && (
                              <div className="flex justify-between mt-1">
                                <span className="font-medium">{t("services.time")}:</span>
                                <span>{program.time}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No special programs available at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Educational Services */}
      <div className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Educational Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quran Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn to read, recite, and understand the Quran with qualified instructors. Classes available for all ages and proficiency levels.
                </p>
                <div className="mt-4 bg-primary/5 p-3 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Days:</span>
                    <span>Saturday, Sunday</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-medium">Time:</span>
                    <span>10:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Arabic Language</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive Arabic language courses taught by native speakers, with a focus on both conversational skills and Quranic Arabic.
                </p>
                <div className="mt-4 bg-primary/5 p-3 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Days:</span>
                    <span>Monday, Wednesday</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-medium">Time:</span>
                    <span>6:00 PM - 8:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Islamic Studies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore Islamic history, principles, and practices through structured courses designed for various knowledge levels.
                </p>
                <div className="mt-4 bg-primary/5 p-3 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Days:</span>
                    <span>Tuesday, Thursday</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-medium">Time:</span>
                    <span>7:00 PM - 9:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Community Services */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">
          Community Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-primary mb-3">Counseling Services</h3>
            <p className="text-muted-foreground mb-4">
              Our imams and trained counselors offer confidential counseling services for individuals and families on various personal and spiritual matters.
            </p>
            <div className="text-sm">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>counseling@tottorimasjid.jp</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>By appointment only</span>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-primary mb-3">Charity and Social Support</h3>
            <p className="text-muted-foreground mb-4">
              We provide assistance to those in need through our zakat and sadaqah funds, food bank, and various community support initiatives.
            </p>
            <div className="text-sm">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>charity@tottorimasjid.jp</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Available during office hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
