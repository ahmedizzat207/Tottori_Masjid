import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, MapPin, Phone, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Extend the contact schema with client-side validations
const extendedContactSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof extendedContactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(extendedContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setFormStatus("idle");
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      setFormStatus("success");
      form.reset();
      
      toast({
        title: "Success",
        description: t("contact.form_success"),
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
      
      toast({
        variant: "destructive",
        title: "Error",
        description: t("contact.form_error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.form_title")}</CardTitle>
                <CardDescription>
                  We'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formStatus === "success" && (
                  <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      {t("contact.form_success")}
                    </AlertDescription>
                  </Alert>
                )}
                
                {formStatus === "error" && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {t("contact.form_error")}
                    </AlertDescription>
                  </Alert>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.name")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.email")}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.subject")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject of your message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.message")}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              rows={5}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : t("contact.submit")}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mt-1 mr-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t("contact.location_title")}</h3>
                    <p className="text-muted-foreground mt-1">
                      {t("contact.address")}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mt-1 mr-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t("contact.email_title")}</h3>
                    <p className="text-muted-foreground mt-1">
                      <a href="mailto:info@tottorimasjid.jp" className="hover:text-primary transition-colors">
                        {t("contact.email_address")}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mt-1 mr-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t("contact.phone_title")}</h3>
                    <p className="text-muted-foreground mt-1">
                      <a href="tel:+81123-456-7890" className="hover:text-primary transition-colors">
                        {t("contact.phone_number")}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mt-1 mr-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t("contact.opening_hours")}</h3>
                    <p className="text-muted-foreground mt-1">
                      {t("contact.open_daily")}
                    </p>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Office Hours:</span>
                        <span>9:00 AM - 5:00 PM (Mon-Fri)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekend Hours:</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div>
              <h3 className="font-medium text-lg mb-3">Find Us</h3>
              <div className="h-[300px] bg-slate-100 rounded-lg">
                <div className="flex items-center justify-center h-full text-center p-6">
                  <p className="text-muted-foreground">
                    Map view is not available. Please use our address above for directions.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">What are the prayer times?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Prayer times vary throughout the year. Please check our homepage or prayer times page for the current schedule.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Do you provide tours of the mosque?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, we welcome visitors. Please contact us in advance to arrange a guided tour.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">How can I make a donation?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can donate online through our website or in person at the mosque.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
