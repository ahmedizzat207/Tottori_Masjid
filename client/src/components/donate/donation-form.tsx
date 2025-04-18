import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDonationSchema } from "@shared/schema";
import { z } from "zod";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Extend donation schema to add client-side validations
const extendedDonationSchema = insertDonationSchema.extend({
  amount: z.coerce.number().positive("Donation amount must be greater than 0"),
  donorName: z.string().optional(),
  donorEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  message: z.string().max(500, "Message must be less than 500 characters").optional().or(z.literal("")),
  donationType: z.enum(["general", "building", "education", "charity"])
});

type DonationFormValues = z.infer<typeof extendedDonationSchema>;

export default function DonationForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(extendedDonationSchema),
    defaultValues: {
      amount: 1000,
      donationType: "general",
      donorName: "",
      donorEmail: "",
      message: ""
    },
  });
  
  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real implementation, you would integrate with a payment gateway here
      
      // Submit donation data to the server
      await apiRequest("POST", "/api/donations", {
        amount: data.amount,
        donorName: data.donorName || null,
        donorEmail: data.donorEmail || null,
        message: data.message || null
      });
      
      // Invalidate donations query cache
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      
      // Show success message
      setIsSuccess(true);
      toast({
        title: t("donate.thank_you_title"),
        description: t("donate.thank_you_message"),
      });
    } catch (err: any) {
      console.error("Donation error:", err);
      setError(err.message || t("donate.error_message"));
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || t("donate.error_message"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const predefinedAmounts = [1000, 5000, 10000, 20000];
  
  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-primary flex items-center justify-center">
            <Check className="mr-2 h-6 w-6" />
            {t("donate.thank_you_title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("donate.thank_you_message")}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => setIsSuccess(false)}>
            Make Another Donation
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("donate.donate_subtitle")}</CardTitle>
        <CardDescription>
          Your donation helps us maintain and expand our services for the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="donationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("donate.donation_types.general")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select donation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">{t("donate.donation_types.general")}</SelectItem>
                      <SelectItem value="building">{t("donate.donation_types.building")}</SelectItem>
                      <SelectItem value="education">{t("donate.donation_types.education")}</SelectItem>
                      <SelectItem value="charity">{t("donate.donation_types.charity")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("donate.amount")}</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <RadioGroup
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        defaultValue={field.value.toString()}
                        className="flex flex-wrap gap-3"
                      >
                        {predefinedAmounts.map((amount) => (
                          <div key={amount} className="flex items-center space-x-2">
                            <RadioGroupItem value={amount.toString()} id={`amount-${amount}`} />
                            <FormLabel htmlFor={`amount-${amount}`} className="font-normal cursor-pointer">
                              {amount.toLocaleString()} {t("donate.currency")}
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                      
                      <div className="relative">
                        <Input
                          placeholder={t("donate.custom_amount")}
                          {...field}
                          value={field.value.toString()}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          className="pl-10"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          ¥
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    All donations are tax-deductible to the extent allowed by law.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("donate.donor_info")}</h3>
              
              <FormField
                control={form.control}
                name="donorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("donate.name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="donorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("donate.email")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
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
                    <FormLabel>{t("donate.message")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message (optional)" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : t("donate.donate_button")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
