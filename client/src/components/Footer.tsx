import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-background border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-2">
                <i className="ri-time-line text-white"></i>
              </div>
              <span className="font-display font-bold text-xl">Chrono Weaver AI</span>
            </div>
            <p className="text-gray-400 mb-4">Navigate the future with confidence using our advanced AI predictive analytics platform.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-twitter-x-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-github-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#use-cases" className="text-gray-400 hover:text-primary transition-colors">Use Cases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Webinars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center md:text-left md:flex md:justify-between md:items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Chrono Weaver AI. All rights reserved.
          </div>
          <div className="text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
