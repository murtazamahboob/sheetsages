import { FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">
                SheetSage<span className="text-primary">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered spreadsheet analysis for smarter decisions.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#features" className="text-muted-foreground hover:text-background transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="text-muted-foreground hover:text-background transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-muted-foreground hover:text-background transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#demo" className="text-muted-foreground hover:text-background transition-colors">
                  Try Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-background transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-background transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-background transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 SheetSage.ai — Operated by Murtaza Mahboob
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Payments powered by</span>
              <span className="font-medium text-background">Paddle</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
