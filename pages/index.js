import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  FiDollarSign, FiPieChart, FiTrendingUp, FiTarget, 
  FiBell, FiCreditCard, FiShield, FiArrowRight,
  FiBarChart2, FiCheckCircle, FiSmartphone, FiGlobe
} from 'react-icons/fi';
import { isAuthenticated } from '../utils/auth';

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  useEffect(() => {
    // Only run client-side
    if (typeof window !== 'undefined') {
      // Check if user is authenticated
      if (isAuthenticated()) {
        // Redirect to dashboard if authenticated
        router.push('/dashboard');
      } else {
        // Just stop checking but stay on landing page
        setCheckingAuth(false);
      }
    }
  }, [router]);
  
  // If checking auth state, show loading
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
        <div className="relative">
          <FiDollarSign className="text-6xl text-primary animate-pulse" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">Loading your financial world...</h2>
      </div>
    );
  }
  
  // Feature data
  const features = [
    {
      icon: <FiPieChart className="w-12 h-12 text-primary" />,
      title: "Smart Budgeting",
      description: "Create and manage budgets easily with automatic spending categorization and real-time tracking."
    },
    {
      icon: <FiTrendingUp className="w-12 h-12 text-secondary" />,
      title: "Expense Tracking",
      description: "Track all your expenses and income in one place with beautiful visualizations and insights."
    },
    {
      icon: <FiTarget className="w-12 h-12 text-accent" />,
      title: "Financial Goals",
      description: "Set, track and achieve your financial goals with our intelligent goal-setting system."
    },
    {
      icon: <FiBarChart2 className="w-12 h-12 text-primary" />,
      title: "AI Insights",
      description: "Get personalized financial advice and insights powered by advanced AI technology."
    },
    {
      icon: <FiGlobe className="w-12 h-12 text-secondary" />,
      title: "Multi-Currency",
      description: "Support for multiple currencies with automatic exchange rate conversions."
    },
    {
      icon: <FiBell className="w-12 h-12 text-accent" />,
      title: "Smart Reminders",
      description: "Never miss a payment or budget limit with customizable reminders and alerts."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      comment: "This app completely changed how I manage both my personal and business finances. The visualization tools are incredible!"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      comment: "As someone who loves data, I appreciate how this app gives me insights into my spending patterns. The AI advice is surprisingly helpful."
    },
    {
      name: "Priya Patel",
      role: "Medical Student",
      comment: "On a tight student budget, this app helps me stay on track and save for the future. The goal setting feature keeps me motivated."
    }
  ];

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center max-w-5xl px-4">
          <div className="max-w-md md:max-w-3xl">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/20 p-4">
                <FiDollarSign className="text-4xl text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Smart Personal Finance Tracker
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-base-content/70">
              Take control of your finances with our intelligent tracking, 
              budgeting, and financial goal-setting platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <a className="btn btn-primary btn-lg">
                  Get Started Free <FiArrowRight className="ml-2" />
                </a>
              </Link>
              <Link href="/login">
                <a className="btn btn-outline btn-lg">
                  Sign In
                </a>
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <div className="flex items-center">
                <FiCheckCircle className="text-success mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <FiCheckCircle className="text-success mr-2" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center">
                <FiShield className="text-success mr-2" />
                <span>Bank-level security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-base-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Everything you need to take control of your financial life in one beautiful, intuitive application.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <div className="card-body">
                  <div className="p-4 rounded-full bg-base-200 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-xl">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-20 px-4 bg-base-200">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Join thousands of users who have transformed their financial habits with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning text-xl">★</span>
                    ))}
                  </div>
                  <p className="mb-6 italic">{testimonial.comment}</p>
                  <div className="flex items-center">
                    <div className="avatar placeholder mr-4">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>{testimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-base-content/70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Finances?</h2>
          <p className="text-xl mb-10 text-base-content/70">
            Join thousands of users who have already taken control of their financial future with our smart tracking tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <a className="btn btn-primary btn-lg">
                Start Your Free Account <FiArrowRight className="ml-2" />
              </a>
            </Link>
            <Link href="/login">
              <a className="btn btn-outline btn-lg">
                Sign In
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer p-10 bg-base-300 text-base-content">
        <div>
          <div className="flex items-center">
            <FiDollarSign className="text-3xl text-primary mr-2" />
            <p className="font-bold text-xl">Financer</p>
          </div>
          <p>Making financial management easy since 2023</p>
        </div> 
        <div>
          <span className="footer-title">Features</span> 
          <a className="link link-hover">Budgeting</a> 
          <a className="link link-hover">Expense Tracking</a> 
          <a className="link link-hover">Goals</a> 
          <a className="link link-hover">AI Advice</a>
        </div> 
        <div>
          <span className="footer-title">Company</span> 
          <a className="link link-hover">About us</a> 
          <a className="link link-hover">Contact</a> 
          <a className="link link-hover">Blog</a> 
        </div> 
        <div>
          <span className="footer-title">Legal</span> 
          <a className="link link-hover">Terms of use</a> 
          <a className="link link-hover">Privacy policy</a> 
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-base-300 text-base-content border-base-200">
        <div className="items-center grid-flow-col">
          <p>© 2023-2025 Financer. All rights reserved.</p>
        </div> 
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
