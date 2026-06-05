import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { RegionsSection } from "@/components/regions-section"
import { PropertiesSection } from "@/components/properties-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FinancingSection } from "@/components/financing-section"
import { FAQSection } from "@/components/faq-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RegionsSection />
      <PropertiesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FinancingSection />
      <FAQSection />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
