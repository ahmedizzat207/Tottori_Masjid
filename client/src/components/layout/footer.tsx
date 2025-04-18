import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube, Church, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com" },
  ];

  const quickLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.events"), href: "/events" },
    { label: t("nav.gallery"), href: "/gallery" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("nav.donate"), href: "/donation" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Masjid Info */}
          <div>
            <div className="flex items-center mb-4">
              <Church className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">{t("masjid_name")}</h3>
            </div>
            <p className="text-sm text-white/80 mb-4">
              A place of worship, learning, and community service dedicated to serving Muslims and promoting interfaith understanding in Tottori.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quick_links")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact_info")}</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 shrink-0" />
                <span className="text-sm text-white/80">
                  {t("contact.address")}
                </span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 shrink-0" />
                <a 
                  href="mailto:info@tottorimasjid.jp" 
                  className="text-sm text-white/80 hover:text-white"
                >
                  {t("contact.email_address")}
                </a>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 shrink-0" />
                <a 
                  href="tel:+81123-456-7890" 
                  className="text-sm text-white/80 hover:text-white"
                >
                  {t("contact.phone_number")}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.subscribe")}</h3>
            <p className="text-sm text-white/80 mb-4">
              Stay updated with our latest news and events.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder={t("footer.email_placeholder")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-r-none"
              />
              <Button className="rounded-l-none bg-white text-primary hover:bg-white/90">
                {t("footer.subscribe_button")}
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="mt-8 mb-6 bg-white/20" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-white/70">
          <p>© {currentYear} {t("masjid_name")}. {t("footer.rights_reserved")}</p>
          <div className="flex mt-3 sm:mt-0">
            <a href="#" className="hover:text-white mr-4 transition-colors">
              {t("footer.privacy_policy")}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.terms_of_service")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
