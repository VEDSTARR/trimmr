import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto mt-12 sm:mt-24 px-4 relative z-10">


        <h1 className="text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
          Modern URL Shortening <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            For the Modern Web
          </span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          The only URL Shortener you&rsquo;ll ever need. Create branded links, track clicks, and manage your audience all in one sleek unified dashboard.
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleShorten}
        className="w-full max-w-3xl mt-12 mb-16 px-4 relative z-10"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50">
          <div className="flex items-center flex-1 w-full pl-4">
            <Link2 className="text-muted-foreground h-5 w-5 mr-3 shrink-0" />
            <Input
              type="url"
              placeholder="Paste your loooong URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 px-0 placeholder:text-muted-foreground/50"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all"
          >
            Shorten!
          </Button>
        </div>
      </form>

      {/* Banner Image */}
      <div className="w-full max-w-6xl mt-8 mb-20 px-4 group relative z-0">
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none rounded-b-2xl md:rounded-b-[2.5rem]"></div>
        <img
          src="/banner1.jpg"
          alt="Dashboard Preview"
          className="w-full rounded-2xl md:rounded-[2.5rem] border border-border/30 shadow-2xl shadow-black/20 group-hover:border-primary/30 transition-all duration-700 group-hover:shadow-primary/10"
        />
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl px-4 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2">Everything you need to know about Trimrr.</p>
        </div>

        <Accordion type="multiple" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl px-6 data-[state=open]:bg-card/80 transition-all">
            <AccordionTrigger className="text-lg font-medium py-6 hover:no-underline hover:text-primary transition-colors">
              How does the Trimrr URL shortener work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
              When you enter a long URL, our system generates a shorter version of
              that URL. This shortened URL redirects to the original long URL when accessed. Our high-performance global edge network ensures instantaneous redirects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl px-6 data-[state=open]:bg-card/80 transition-all">
            <AccordionTrigger className="text-lg font-medium py-6 hover:no-underline hover:text-primary transition-colors">
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
              Yes. Creating an account allows you to manage your URLs, view
              analytics, customize your short URLs with custom aliases, and generate branded QR codes for your links.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl px-6 data-[state=open]:bg-card/80 transition-all">
            <AccordionTrigger className="text-lg font-medium py-6 hover:no-underline hover:text-primary transition-colors">
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
              You get access to a comprehensive analytics dashboard. View the number of clicks over time, geolocation data (countries/cities) of the clicks, device types, and referrers to see where your traffic is coming from.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
