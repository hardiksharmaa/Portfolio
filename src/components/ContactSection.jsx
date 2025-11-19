import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  GithubIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

// 🔑 CONFIGURATION: Get the key from environment variables.
// NOTE: Assuming Vite/modern setup (import.meta.env). 
// If using Create React App (CRA), use: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY; 

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the key is available
    if (!ACCESS_KEY) {
        console.error("Web3Forms Access Key is missing. Check your .env.local file and build configuration.");
        toast({
            title: "Configuration Error",
            description: "Contact key is missing. Please check console.",
            variant: "destructive",
        });
        return;
    }
    
    setIsSubmitting(true);

    try {
      // 1. Prepare data including the required access_key
      const data = {
        ...formData,
        access_key: ACCESS_KEY,
        subject: `New Portfolio Message from ${formData.name}`,
      };

      // 2. Send the request to the Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Success Toast
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        
        // Reset form fields
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        // Handle API-side error (e.g., key missing, validation failure)
        console.error("Web3Forms Error:", result.message);
        toast({
          title: "Error sending message.",
          description: result.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Handle network errors
      console.error("Submission error:", error);
      toast({
        title: "Network Error.",
        description: "Could not reach the form service.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              Contact Information
            </h3>
            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:hs489819@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    hs489819@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+917889480969"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 7889480969
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <span className="text-muted-foreground hover:text-primary transition-colors">
                    Jammu, J&K
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/in/hardiksh121/" target="_blank">
                  <Linkedin />
                </a>
                <a href="https://www.instagram.com/whyhardikk/" target="_blank">
                  <Instagram />
                </a>
                <a href="https://github.com/hardiksharmaa" target="_blank">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}> 
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="John doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="john@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cursor-pointer cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};