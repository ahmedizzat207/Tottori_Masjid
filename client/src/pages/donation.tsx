import { useLanguage } from "@/hooks/use-language";
import DonationForm from "@/components/donate/donation-form";

export default function Donation() {
  const { t } = useLanguage();
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("donate.title")}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("donate.subtitle")}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="order-2 lg:order-1">
            <DonationForm />
          </div>
          
          {/* Donation Information */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Why Your Support Matters
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Your generous donations help us maintain and expand the services we offer to our community. From religious education to community outreach, every contribution makes a difference.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Mosque Maintenance</h3>
                <p className="text-muted-foreground">
                  Your donations help us maintain our facilities, ensuring a clean, safe, and welcoming space for worship and community gatherings.
                </p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Educational Programs</h3>
                <p className="text-muted-foreground">
                  Support our Quran classes, Arabic language courses, and Islamic studies programs for people of all ages.
                </p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Community Services</h3>
                <p className="text-muted-foreground">
                  Help fund our community services, including counseling, food banks, and support for those in need.
                </p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Special Events</h3>
                <p className="text-muted-foreground">
                  Contribute to our Ramadan iftar dinners, Eid celebrations, and other special community events throughout the year.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Other Ways to Donate</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Bank Transfer:</strong> You can make a direct bank transfer to our account. Please contact us for banking details.
                </p>
                <p>
                  <strong>In Person:</strong> Donations can be made in person at the mosque during office hours.
                </p>
                <p>
                  <strong>Monthly Giving:</strong> Consider becoming a monthly donor to provide consistent support for our programs and services.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Donation Impact Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Your Impact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">
                Community members benefiting from our services weekly
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">
                Children and adults in our educational programs
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">
                Years serving the Muslim community in Tottori
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Words from Our Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-3">
                    "The Tottori Masjid has been a spiritual home for me and my family. The educational programs have been invaluable for my children's Islamic upbringing."
                  </p>
                  <div className="font-medium">Ahmed K.</div>
                  <div className="text-sm text-muted-foreground">Community Member</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-3">
                    "As a new Muslim, the community at Tottori Masjid has welcomed me with open arms and provided me with the guidance and support I needed on my journey."
                  </p>
                  <div className="font-medium">Yuki T.</div>
                  <div className="text-sm text-muted-foreground">New Member</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
