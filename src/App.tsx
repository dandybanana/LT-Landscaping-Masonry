/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Shovel, 
  Hammer, 
  Fence, 
  LayoutGrid, 
  Scissors, 
  Flower2, 
  ArrowRight,
  Menu,
  X,
  Mail,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BUSINESS_DETAILS = {
  name: "LT Landscaping & Masonry",
  phone: "(203) 509-7222",
  address: "54 Commerce St, Norwalk, CT 06850",
  reviews: "4.8 stars from 44 Google reviews"
};

const SERVICES = [
  { name: "Landscaping", icon: Shovel, desc: "Complete landscape design and installation." },
  { name: "Masonry", icon: Hammer, desc: "Expert stonework, steps, and custom masonry." },
  { name: "Retaining Walls", icon: Fence, desc: "Structural and decorative stone wall solutions." },
  { name: "Patios & Walkways", icon: LayoutGrid, desc: "Beautiful outdoor living spaces and paths." },
  { name: "Lawn Maintenance", icon: Scissors, desc: "Professional mowing, edging, and lawn care." },
  { name: "Pruning & Planting", icon: Flower2, desc: "Seasonal planting and expert shrub pruning." }
];

const PROJECTS = [
  { id: 1, src: "/stonewalkwayandgarden.png", alt: "Stone walkway and garden" },
  { id: 2, src: "/outdoorfireplacearea.png", alt: "Outdoor fireplace area" },
  { id: 3, src: "/sidegarden.png", alt: "Side garden landscaping" },
  { id: 4, src: "/lawn.png", alt: "Manicured lawn and landscaping" }
];

const TESTIMONIALS = [
  { 
    text: "The quality of work is matched only by the owners and their crews. L&T seamlessly expanded our walkway into a patio in just days, and we love seeing their landscapers weekly for our mowing and pruning.", 
    author: "Aaron A." 
  },
  { 
    text: "Extremely professional with extensive knowledge. They fixed our grass and created beautiful garden beds that tremendously improved our curb appeal. They've serviced our house for 2 years and now my neighbors are asking for their number.", 
    author: "Frank R." 
  },
  { 
    text: "Extremely pleased with the professionalism of Jose and his team. They replaced a rotting railroad tie retaining wall with an amazing stone wall. Jose gave a reasonable quote, started on time, and was very accommodating with minor changes.", 
    author: "LJ K." 
  }
];

const GalleryImage: React.FC<{ src: string, alt: string }> = ({ src, alt }) => {
  const [error, setError] = useState(false);
  
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-100 aspect-[4/3] relative border border-zinc-200 flex items-center justify-center">
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={() => setError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="text-center p-4">
          <p className="text-zinc-400 text-xs font-mono break-all">{src}</p>
          <p className="text-zinc-300 text-[10px] mt-1 uppercase tracking-widest font-bold">Image failed to load</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Landscaping',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/mzdjgypy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Landscaping',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center">
                <Shovel className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900">LT LANDSCAPING</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-zinc-600 hover:text-emerald-800 transition-colors">Services</a>
              <a href="#projects" className="text-sm font-medium text-zinc-600 hover:text-emerald-800 transition-colors">Projects</a>
              <a href="#about" className="text-sm font-medium text-zinc-600 hover:text-emerald-800 transition-colors">Why Choose Us</a>
              <a href={`tel:${BUSINESS_DETAILS.phone.replace(/\D/g,'')}`} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-800 text-white rounded-full text-sm font-semibold hover:bg-emerald-900 transition-all shadow-sm">
                <Phone className="w-4 h-4" />
                {BUSINESS_DETAILS.phone}
              </a>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Services</a>
                <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Projects</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Why Choose Us</a>
                <a href={`tel:${BUSINESS_DETAILS.phone.replace(/\D/g,'')}`} className="flex items-center gap-2 w-full justify-center py-4 bg-emerald-800 text-white rounded-xl font-bold">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm font-bold mb-6">
                <CheckCircle2 className="w-4 h-4" />
                Quality Craftsmanship • Reliable Service
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 mb-8 leading-[0.95]">
                Expert <span className="text-emerald-800">Landscaping & Masonry</span> in Norwalk
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 mb-12 max-w-xl leading-relaxed">
                From custom stonework to meticulous lawn maintenance, we bring professional care to every property. Locally owned and dedicated to making your outdoor space look its absolute best.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#quote" className="w-full sm:w-auto px-8 py-5 bg-emerald-800 text-white rounded-2xl font-bold text-lg hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2">
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href={`tel:${BUSINESS_DETAILS.phone.replace(/\D/g,'')}`} className="w-full sm:w-auto px-8 py-5 bg-zinc-100 text-zinc-900 rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-zinc-900/20 border-8 border-white">
                <img 
                  src="/stonewalkwayandgarden.png" 
                  alt="Beautiful stone walkway and garden" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">Our Promise</p>
                <p className="text-lg font-black text-zinc-900">Quality Craftsmanship</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-emerald-800 uppercase mb-4">Our Services</h2>
            <p className="text-4xl font-black text-zinc-900">What We Do Best</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="text-emerald-800 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{service.name}</h3>
                <p className="text-zinc-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-emerald-800 uppercase mb-4">Why Choose Us</h2>
              <h3 className="text-4xl md:text-5xl font-black text-zinc-900 mb-8 leading-tight">
                Quality Craftsmanship, <br />Local Expertise.
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Local Norwalk Business", desc: "Proudly serving Norwalk and surrounding Fairfield County communities." },
                  { title: "Attention to Detail", desc: "We treat every project as if it were our own home." },
                  { title: "Reliable Scheduling", desc: "We show up on time and complete projects as promised." },
                  { title: "Fair & Honest Pricing", desc: "Direct communication and transparent estimates." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-emerald-800 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-lg">{item.title}</h4>
                      <p className="text-zinc-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 rounded-[2rem] p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <Star className="w-12 h-12 text-emerald-400 mb-6 fill-emerald-400" />
                <p className="text-3xl font-bold mb-8 leading-tight italic">
                  "Our goal is to provide the highest quality landscaping and masonry services while building lasting relationships with our clients."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-emerald-400"></div>
                  <span className="font-bold tracking-widest uppercase text-sm">LT Landscaping & Masonry</span>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-emerald-800 uppercase mb-4">Our Work</h2>
              <p className="text-4xl font-black text-zinc-900">Recent Projects</p>
            </div>
            <p className="text-zinc-600 max-w-md">
              A glimpse into the quality and variety of landscaping and masonry projects we've completed for our local clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <GalleryImage key={project.id} src={project.src} alt={project.alt} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="relative">
                <div className="text-emerald-800/10 text-8xl font-serif absolute -top-10 -left-4 select-none">"</div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-emerald-600 text-emerald-600" />)}
                  </div>
                  <p className="text-lg text-zinc-700 mb-6 leading-relaxed">
                    {t.text}
                  </p>
                  <p className="font-bold text-zinc-900">— {t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="quote" className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4">Get in Touch</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to Start Your Project?</h3>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
                Contact us today for a free estimate. Whether it's a small repair or a complete landscape overhaul, we're here to help.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm uppercase font-bold tracking-widest">Call Us</p>
                    <a href={`tel:${BUSINESS_DETAILS.phone.replace(/\D/g,'')}`} className="text-xl font-bold hover:text-emerald-400 transition-colors">
                      {BUSINESS_DETAILS.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm uppercase font-bold tracking-widest">Our Location</p>
                    <p className="text-xl font-bold">{BUSINESS_DETAILS.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm uppercase font-bold tracking-widest">Business Hours</p>
                    <p className="text-xl font-bold">Mon - Sat: 7:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 md:p-12 text-zinc-900">
              <h4 className="text-2xl font-black mb-8">Request a Quote</h4>
              
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-800" />
                  </div>
                  <h5 className="text-xl font-bold text-emerald-900 mb-2">Thank You!</h5>
                  <p className="text-emerald-800">Your estimate request has been sent. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-sm font-bold text-emerald-800 underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-xl text-sm font-medium">
                      Something went wrong. Please try again or call us directly.
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all" 
                        placeholder="Your Name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all" 
                        placeholder="Your Phone Number" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Service Needed</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all appearance-none"
                    >
                      <option>Landscaping</option>
                      <option>Masonry</option>
                      <option>Retaining Walls</option>
                      <option>Patios & Walkways</option>
                      <option>Lawn Maintenance</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Message</label>
                    <textarea 
                      name="message"
                      required
                      rows={4} 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all" 
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'loading'}
                    className="w-full py-5 bg-emerald-800 text-white rounded-xl font-bold text-lg hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Request'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-950 text-zinc-500 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-800 rounded flex items-center justify-center">
                <Shovel className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">LT LANDSCAPING</span>
            </div>
            
            <div className="flex gap-8 text-sm font-medium">
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#quote" className="hover:text-white transition-colors">Contact</a>
            </div>

            <p className="text-xs">
              © {new Date().getFullYear()} {BUSINESS_DETAILS.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
