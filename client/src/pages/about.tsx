import { useLanguage } from "@/hooks/use-language";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Heart, Book, Users, Globe, HandHeart } from "lucide-react";
import { createIslamicPatternSVG } from "@/lib/utils";

export default function About() {
  const { t } = useLanguage();

  const values = [
    { 
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: t("about.values.worship"),
      description: "Maintaining the highest standards in religious practices and prayer services."
    },
    { 
      icon: <Book className="h-6 w-6 text-primary" />,
      title: t("about.values.education"),
      description: "Providing quality Islamic education for all ages and backgrounds."
    },
    { 
      icon: <Users className="h-6 w-6 text-primary" />,
      title: t("about.values.community"),
      description: "Serving the needs of our community through various programs and initiatives."
    },
    { 
      icon: <HandHeart className="h-6 w-6 text-primary" />,
      title: t("about.values.inclusion"),
      description: "Embracing diversity and ensuring everyone feels welcome in our masjid."
    },
    { 
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: t("about.values.cooperation"),
      description: "Building bridges with other faith communities and promoting mutual understanding."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("about.title")}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("about.history_title")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("about.history_content")}
            </p>

            <div 
              className="w-full h-64 rounded-lg mb-6 overflow-hidden"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1588423566482-cbbb3a6f6dc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />

            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("about.mission_title")}
            </h2>
            <p className="text-muted-foreground">
              {t("about.mission_content")}
            </p>
          </div>

          <div>
            <div 
              className="w-full h-64 rounded-lg mb-6 overflow-hidden"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1584717105191-83704ecb7a97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />

            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("about.vision_title")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("about.vision_content")}
            </p>

            <div
              className="p-6 rounded-lg border"
              style={{ 
                backgroundImage: createIslamicPatternSVG(),
                backgroundAttachment: "fixed"
              }}
            >
              <h3 className="text-xl font-bold text-primary mb-4">
                {t("about.values_title")}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {values.map((value, index) => (
                  <Card key={index} className="bg-white/80">
                    <CardContent className="pt-6">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">{value.icon}</div>
                        <div>
                          <h4 className="font-medium">{value.title}</h4>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Leaders Section */}
      <div className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Our Imam and Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4 bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <CardTitle>Imam Abdullah Rahman</CardTitle>
                <CardDescription>Head Imam</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>Leading our community since 2015 with profound knowledge of Islamic teachings and a compassionate approach to guidance.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4 bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <CardTitle>Yusuf Tanaka</CardTitle>
                <CardDescription>President of the Board</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>Coordinating the masjid's operations and community initiatives with dedication and strategic vision.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4 bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <CardTitle>Dr. Aisha Watanabe</CardTitle>
                <CardDescription>Director of Education</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>Overseeing our educational programs with expertise in Islamic studies and contemporary teaching methods.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
