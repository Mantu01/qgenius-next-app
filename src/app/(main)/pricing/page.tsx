'use client';

import React from 'react';
import { Check, Zap, Infinity, Rocket, Stars, Shield, Globe, Users } from 'lucide-react';
import Image from 'next/image';

export default function Pricing() {
  const tiers = [
    {
      name: "Free Forever",
      tagline: "It's free now, you can do as much as you want",
      price: "$0",
      description: "Perfect for cosmic explorers just starting their quantum journey",
      features: [
        "Unlimited basic quantum computations",
        "Access to community knowledge base",
        "5 quantum simulations per day",
        "Basic quantum algorithm library",
        "Email support"
      ],
      cta: "Start Exploring",
      featured: false
    },
    {
      name: "Quantum Pro",
      tagline: "For serious interstellar researchers",
      price: "$29",
      description: "Everything you need to conduct professional quantum research",
      features: [
        "Everything in Free",
        "Unlimited quantum simulations",
        "Advanced algorithm library",
        "Priority email support",
        "Early access to new features",
        "10GB quantum data storage"
      ],
      cta: "Upgrade Now",
      featured: true
    },
    {
      name: "Galactic Enterprise",
      tagline: "For organizations pushing boundaries",
      price: "Custom",
      description: "For research institutions and interstellar corporations",
      features: [
        "Everything in Pro",
        "Dedicated quantum computing resources",
        "On-call engineering support",
        "Custom quantum solutions",
        "Multi-user collaboration",
        "Unlimited data storage",
        "API access"
      ],
      cta: "Contact Us",
      featured: false
    }
  ];

  const faqs = [
    {
      question: "Is there really no limit on the free tier?",
      answer: "Yes! Our free tier offers unlimited basic usage because we believe quantum computing should be accessible to everyone in the universe."
    },
    {
      question: "Can I switch plans later?",
      answer: "Absolutely. You can upgrade, downgrade, or cancel anytime with just a few clicks from your control panel."
    },
    {
      question: "How does the Enterprise plan work?",
      answer: "Our Enterprise plan is customized for each organization. Contact our cosmic sales team to discuss your specific quantum computing needs."
    },
    {
      question: "Is my quantum data secure?",
      answer: "We use quantum encryption protocols that even the most advanced alien civilizations can't break. Your research is safe with us."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 dark:from-blue-900/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
            <div className="flex items-center gap-x-4">
              <span className="rounded-full bg-blue-600/10 dark:bg-blue-400/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600/10 dark:ring-blue-400/10">
                Pricing
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/20 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20">
                <Zap className="h-3 w-3 mr-1" />
                It's free now, you can do as much as you want
              </span>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Quantum computing for all civilizations
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              From curious individuals to advanced alien species, we have a plan that fits your quantum computing needs across the multiverse.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                Start for free
              </button>
              <button className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-100/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
                  alt="Quantum computing interface"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-100/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Simple pricing for complex quantum computing
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-gray-300">
          Choose the perfect plan for your quantum computing needs. Upgrade, downgrade, or cancel anytime.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.name}
              className={classNames(
                tier.featured ? "bg-gray-900 dark:bg-gray-800 ring-2 ring-blue-600" : "bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-700",
                "rounded-3xl p-8 xl:p-10"
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.name}
                  className={classNames(
                    tier.featured ? "text-white" : "text-gray-900 dark:text-white",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h3>
                {tier.featured ? (
                  <p className="rounded-full bg-blue-600/10 dark:bg-blue-400/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600 dark:text-blue-400">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className={classNames(
                tier.featured ? "text-blue-200" : "text-gray-600 dark:text-gray-400",
                "mt-2 text-sm"
              )}>
                {tier.tagline}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className={classNames(
                  tier.featured ? "text-white" : "text-gray-900 dark:text-white",
                  "text-4xl font-bold tracking-tight"
                )}>
                  {tier.price}
                </span>
                {tier.price !== "Custom" && (
                  <span className={classNames(
                    tier.featured ? "text-gray-300" : "text-gray-500 dark:text-gray-400",
                    "text-sm font-semibold leading-6"
                  )}>
                    /month
                  </span>
                )}
              </p>
              <p className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600 dark:text-gray-400",
                "mt-4 text-sm"
              )}>
                {tier.description}
              </p>
              <button
                aria-describedby={tier.name}
                className={classNames(
                  tier.featured
                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-500"
                    : "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600",
                  "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all w-full"
                )}
              >
                {tier.cta}
              </button>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600 dark:text-gray-400",
                  "mt-8 space-y-3 text-sm leading-6 xl:mt-10"
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className={classNames(
                      tier.featured ? "text-blue-400" : "text-blue-600 dark:text-blue-400",
                      "h-6 w-5 flex-none"
                    )} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
            Compare all features
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Every plan includes
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Unlimited basic usage",
              icon: Infinity,
              description: "Run as many basic quantum operations as you need, no throttling"
            },
            {
              name: "Multidimensional support",
              icon: Globe,
              description: "Works across all known dimensions and parallel universes"
            },
            {
              name: "Quantum security",
              icon: Shield,
              description: "Military-grade quantum encryption for all your data"
            },
            {
              name: "Instant scaling",
              icon: Rocket,
              description: "Automatically scales to handle your most complex computations"
            },
            {
              name: "Continuous updates",
              icon: Zap,
              description: "Regular updates with the latest quantum breakthroughs"
            },
            {
              name: "Community access",
              icon: Users,
              description: "Join our galactic community of quantum researchers"
            }
          ].map((feature) => (
            <div key={feature.name} className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-xl">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto my-32 max-w-7xl px-6 sm:my-40 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-gray-100/10">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-gray-100/10">
            {faqs.map((faq) => (
              <div key={faq.question} className="pt-6">
                <dt>
                  <button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                    <span className="text-base font-semibold leading-7">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-blue-700 dark:bg-blue-900 py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 transform">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-800">
              <Stars className="h-16 w-16 text-white" />
            </div>
          </div>
          <div className="mx-auto max-w-2xl text-center pt-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to explore quantum computing?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join millions of researchers across the galaxy who are already using QGenius.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all">
                Start for free
              </button>
              <button className="text-sm font-semibold leading-6 text-white hover:text-blue-100 transition-colors">
                Contact sales <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes: string[]): string{
  return classes.filter(Boolean).join(' ');
}