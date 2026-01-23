import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram,
  MessageCircle,
  Heart
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: MessageCircle, href: "https://wa.me/8801973133814", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text">Sadik</span>
            <span className="text-foreground">.dev</span>
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-muted-foreground text-sm">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Sadik Hasnat
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
