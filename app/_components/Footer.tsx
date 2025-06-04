import { Button } from "@/components/ui/button";
import { Facebook, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const links = [
    "Safety & Privacy Center",
    "Privacy Policy",
    "Cookies",
    "About Ads",
    "Accessibility",
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "GitHub", icon: Github, href: "https://github.com" },
  ];

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between">
        <div>
          {links.map((link, index) => (
            <Link
              key={index}
              href="#"
              className="text-sm text-gray-500 hover:text-gray-400 mr-2"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          <p>© 2023 Audionix</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        {socialLinks.map((social, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            asChild
            className="rounded-full"
          >
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <social.icon className="h-5 w-5" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default Footer;
