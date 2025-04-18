import { Link } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Church } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentLanguage: string;
  onLanguageChange: (value: string) => void;
}

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  currentLanguage,
  onLanguageChange,
}: MobileNavProps) {
  const { t } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center mb-6">
            <Church className="h-6 w-6 text-primary mr-2" />
            <span>{t('masjid_name')}</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-4 pr-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex py-2 text-foreground/60 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/donation"
              onClick={onClose}
              className="flex py-2 text-primary font-medium"
            >
              {t('nav.donate')}
            </Link>
          </div>
          <div className="mt-6 pt-6 border-t pr-6">
            <Select value={currentLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder={t("language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="jp">日本語</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full" asChild>
              <Link href="/donation" onClick={onClose}>
                {t('nav.donate')}
              </Link>
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
