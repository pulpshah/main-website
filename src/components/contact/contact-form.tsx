"use client";

import { useState } from "react";
import { getPostHogDistinctId, identifyPostHogUser } from "@/components/PostHogProvider";

interface FormState {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  distinctId?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState("");
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formState.subject) {
      newErrors.subject = "Please select a subject";
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Get PostHog distinctId
      const distinctId = getPostHogDistinctId();
      
      // Identify user in PostHog with their email and name
      if (distinctId) {
        identifyPostHogUser(formState.email, {
          name: formState.name,
          company: formState.company || undefined,
          $email: formState.email
        });
      }
      
      // Add distinctId to the form data
      const formData = {
        ...formState,
        distinctId
      };
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit the form');
      }
      
      // Form submitted successfully
      setSubmitStatus('success');
      setStatusMessage("Thank you for your message! We'll be in touch soon.");
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-center animate-fadeIn">
          <p className="text-green-300">{statusMessage}</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-center animate-fadeIn">
          <p className="text-red-300">{statusMessage}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/30 backdrop-blur-sm border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/30 backdrop-blur-sm border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-gray-200">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Your company"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-200">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/30 backdrop-blur-sm border ${errors.subject ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
            disabled={isSubmitting}
          >
            <option value="" disabled>Select an option</option>
            <option value="demo">Request a Demo</option>
            <option value="pricing">Pricing Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && (
            <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formState.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-800/30 backdrop-blur-sm border ${errors.message ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none`}
          placeholder="Tell us how we can help you..."
          disabled={isSubmitting}
        ></textarea>
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message}</p>
        )}
      </div>
      
      <div className="flex justify-center pt-4">
        <button 
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium shadow-lg shadow-purple-900/30 transition-all hover:shadow-xl hover:shadow-purple-700/40 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Send Message
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5"
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
} 