import { useState, useEffect, FormEvent } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import {
  BUSINESS_WHATSAPP_URL,
  HOME_SERVICE_AREAS,
  PLUMBING_SERVICES,
  WHATSAPP_REQUEST_SERVICES,
} from '../data/plumbingData';
import { WhatsAppLogoIcon } from './Icons';

interface ContactFormProps {
  selectedService: string;
  contactIntent: 'call' | 'whatsapp' | 'request' | null;
}

export function ContactForm({ selectedService }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState(selectedService || '');
  const [location, setLocation] = useState('');
  const [problem, setProblem] = useState('');
  const [error, setError] = useState('');
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedMobile = mobile.trim();
    const trimmedService = service.trim();
    const trimmedLocation = location.trim();
    const trimmedProblem = problem.trim();

    if (!trimmedName || !trimmedMobile || !trimmedService || !trimmedLocation || !trimmedProblem) {
      setError('Please fill in all required (*) fields before sending your request on WhatsApp.');
      setLastWhatsAppUrl('');
      return;
    }

    const digitsOnly = trimmedMobile.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      setLastWhatsAppUrl('');
      return;
    }

    setError('');

    const formattedMessage = [
      'Hello FIXIT PLUMBER,',
      '',
      'I would like to request plumbing assistance.',
      '',
      `Name: ${trimmedName}`,
      `Mobile Number: ${trimmedMobile}`,
      `Required Service: ${trimmedService}`,
      `Location: ${trimmedLocation}`,
      `Problem Description: ${trimmedProblem}`,
      '',
      'Please contact me regarding my plumbing service request.',
      '',
      'Thank you.',
    ].join('\n');

    const whatsappUrl = `${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent(formattedMessage)}`;
    setLastWhatsAppUrl(whatsappUrl);

    const anchor = document.createElement('a');
    anchor.href = whatsappUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="bg-[#EEF2EB] border border-[#96A292] rounded-[18px] p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#002B5C] leading-snug tracking-tight">
          Send a WhatsApp Message Request
        </h3>
        <p className="mt-2 text-[13.5px] sm:text-[14.5px] text-[#374151] leading-relaxed">
          Need plumbing assistance? Fill out the form below and send your service request directly
          to FIXIT PLUMBER on WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-[13px] text-red-700 font-medium"
          >
            {error}
          </div>
        )}

        {/* 1. Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full h-11 px-3 rounded-md bg-white/85 border border-[#64748B] text-sm text-[#111827] placeholder:text-[#525B66] focus:outline-none focus:ring-2 focus:ring-[#065F96]"
          />
        </div>

        {/* 2. Mobile Number */}
        <div>
          <label htmlFor="mobileNumber" className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
            Mobile Number *
          </label>
          <div className="flex items-center h-11 px-3 rounded-md bg-white/85 border border-[#64748B] focus-within:ring-2 focus-within:ring-[#065F96]">
            <span className="flex items-center gap-1.5 pr-2.5 mr-2.5 border-r border-[#64748B]/40 text-xs font-medium text-[#374151] select-none shrink-0">
              <span aria-hidden="true">🇮🇳</span>
              <span>+91</span>
            </span>
            <input
              id="mobileNumber"
              type="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#525B66] focus:outline-none"
            />
          </div>
        </div>

        {/* 3. Select Your Service */}
        <div>
          <label
            htmlFor="plumbingService"
            className="block text-[12px] font-semibold text-[#1F2937] mb-1.5"
          >
            Select Your Service *
          </label>
          <div className="relative">
            <select
              id="plumbingService"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full h-11 pl-3 pr-9 rounded-md bg-white/85 border border-[#64748B] text-sm text-[#111827] appearance-none focus:outline-none focus:ring-2 focus:ring-[#065F96]"
            >
              <option value="">Choose a plumbing service</option>
              <optgroup label="Main Plumbing Services">
                {WHATSAPP_REQUEST_SERVICES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Specific Plumbing Services">
                {PLUMBING_SERVICES.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-4 h-4 text-[#475569] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. Your Location / Area */}
        <div>
          <label
            htmlFor="customerLocation"
            className="block text-[12px] font-semibold text-[#1F2937] mb-1.5"
          >
            Your Location / Area *
          </label>
          <input
            id="customerLocation"
            type="text"
            required
            list="patna-area-options"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Boring Road, Kankarbagh, Patna"
            className="w-full h-11 px-3 rounded-md bg-white/85 border border-[#64748B] text-sm text-[#111827] placeholder:text-[#525B66] focus:outline-none focus:ring-2 focus:ring-[#065F96]"
          />
          <datalist id="patna-area-options">
            {HOME_SERVICE_AREAS.map((areaName) => (
              <option key={areaName} value={areaName} />
            ))}
          </datalist>
        </div>

        {/* 5. Describe Your Plumbing Problem */}
        <div>
          <label
            htmlFor="problemDescription"
            className="block text-[12px] font-semibold text-[#1F2937] mb-1.5"
          >
            Describe Your Plumbing Problem *
          </label>
          <textarea
            id="problemDescription"
            required
            rows={4}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Please describe your plumbing issue..."
            className="w-full p-3 rounded-md bg-white/85 border border-[#64748B] text-sm text-[#111827] placeholder:text-[#525B66] focus:outline-none focus:ring-2 focus:ring-[#065F96] resize-y"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#137A39] hover:bg-[#0E632D] text-white rounded-full py-3.5 px-6 text-[13.5px] font-semibold inline-flex items-center justify-center gap-2.5 shadow-sm transition-colors cursor-pointer"
        >
          <WhatsAppLogoIcon className="w-4 h-4 shrink-0" />
          <span>Send Request on WhatsApp</span>
        </button>

        {lastWhatsAppUrl && (
          <div className="pt-1 text-center text-[12.5px] text-[#374151]">
            WhatsApp did not open automatically?{' '}
            <a
              href={lastWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#002B5C] underline inline-flex items-center gap-1 hover:text-[#135CB8]"
            >
              <span>Click here to open WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
