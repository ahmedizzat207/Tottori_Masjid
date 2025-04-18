import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { Logo } from "@/components/ui/logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";

export default function Header() {
  const [location] = useLocation();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Track scrolling for header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/events", label: t("nav.events") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLanguageChange = (value: string) => {
    changeLanguage(value as "en" | "jp");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2" 
        : "bg-transparent py-4"
    }`}>
      <div className="container flex items-center">
        <div className="flex items-center mr-4">
          <Link href="/" className="transition-transform hover:scale-105 duration-300">
            <Logo 
              size="md" 
              variant={theme === "dark" ? "light" : "dark"}
            />
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-primary ${
                  location === item.href ? "text-primary font-semibold" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Select value={currentLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder={t("language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="jp">日本語</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
              <Link href="/donation">{t("nav.donate")}</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </header>
  );
}
