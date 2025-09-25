import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import Demo from '@/components/landing/demo'
import HowItWorks from '@/components/landing/how-it-works'
import Pricing from '@/components/landing/pricing'
import CTA from '@/components/landing/cta'
import Footer from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen gradient-background">
      <Hero />
      <Demo />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}