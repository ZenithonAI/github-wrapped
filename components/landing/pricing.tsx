'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Sparkles, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with your GitHub wrapped',
    gradient: 'from-gray-500 to-gray-600',
    popular: false,
    features: [
      '5 basic stat cards',
      'Standard dark theme',
      'Basic insights',
      'Social media sharing',
      'Watermarked images',
      'Community support'
    ],
    limitations: [
      'Limited card types',
      'No custom themes',
      'No historical years',
      'Basic personality analysis'
    ],
    cta: 'Get Started Free',
    icon: Github
  },
  {
    name: 'Pro',
    price: '$4.99',
    period: 'one-time',
    description: 'Unlock the full power of GitHub Wrapped with premium features',
    gradient: 'from-primary-500 to-secondary-600',
    popular: true,
    features: [
      'All 12+ unique cards',
      'Premium themes & styles',
      'Advanced AI insights',
      'Video generation (coming soon)',
      'No watermarks',
      'Historical years (2024, 2023)',
      'Priority processing',
      'Custom color schemes',
      'Batch image export',
      'Priority support'
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    icon: Crown,
    savings: 'Most popular'
  }
]

const testimonials = [
  {
    text: "This is incredible! My GitHub year has never looked so good!",
    author: "@developer1",
    role: "Frontend Developer"
  },
  {
    text: "The night owl analysis is scary accurate 😅",
    author: "@coder2",
    role: "Full-stack Engineer"
  },
  {
    text: "Already shared with my team. We're all comparing our wrapped!",
    author: "@techleader3",
    role: "Engineering Manager"
  }
]

export default function Pricing() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Simple pricing</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Plan</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Start for free, upgrade for the full experience. One-time payment,
            lifetime access to your wrapped.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative glass-card p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: 12 }}
                  whileInView={{ scale: 1, rotate: 12 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-bold"
                >
                  {plan.savings}
                </motion.div>
              )}

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 rounded-xl`} />

              {/* Header */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${plan.gradient} rounded-xl`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <div className="text-gray-400 text-sm">/{plan.period}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="relative z-10 mb-8">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary-400" />
                  What's included
                </h4>
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Zap, title: '60 Second Setup', description: 'Get your wrapped in under a minute' },
              { icon: Star, title: 'One-time Payment', description: 'No subscriptions, pay once and own forever' },
              { icon: Crown, title: 'Lifetime Updates', description: 'Future features included with pro plan' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl"
            >
              <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-400">
                    {testimonial.author[1]}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Questions?</h3>
          <p className="text-gray-300 mb-6">
            Check our FAQ or reach out - we're here to help make your wrapped perfect.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>🔒 Your data stays private</span>
            <span>⚡ No recurring charges</span>
            <span>📱 Works on all devices</span>
            <span>💝 30-day money back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}