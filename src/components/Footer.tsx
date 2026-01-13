import { FileSpreadsheet } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              SheetSage<span className="text-primary">.ai</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2024 SheetSage.ai — Your AI Spreadsheet Decision Partner
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-background transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-background transition-colors">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-background transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
