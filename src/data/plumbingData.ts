export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
}

export interface CategoryCardItem {
  id: string;
  title: string;
  description: string;
  targetServiceId: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BUSINESS_PHONE_DISPLAY = '9507611252';
export const BUSINESS_PHONE_TEL = 'tel:+919507611252';
export const BUSINESS_WHATSAPP_URL = 'https://wa.me/919507611252';
export const BUSINESS_WHATSAPP_DEFAULT_MESSAGE =
  'Hello FIXIT PLUMBER, I need plumbing service. Please contact me.';
export const BUSINESS_WHATSAPP_LINK = `${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent(
  BUSINESS_WHATSAPP_DEFAULT_MESSAGE
)}`;
export const BUSINESS_EMAIL = 'plumbingservices9099@gmail.com';
export const BUSINESS_EMAIL_LINK = 'mailto:plumbingservices9099@gmail.com';

export const WHATSAPP_REQUEST_SERVICES = [
  'General Plumbing Service',
  'Installation & Replacement',
  'Drain & Sewer Services',
  'New Construction & Remodeling',
  'Plumbing Maintenance & Inspection',
] as const;

export const HERO_FEATURES = [
  'Professional and careful workmanship',
  'Practical solutions for plumbing problems',
  'Attention to quality and proper pipe connections',
  'Clear communication with customers',
  'Customer-focused plumbing services',
];

export const STATS_CARDS = [
  { id: 'experience', value: '12+', label: 'Years of Experience' },
  { id: 'customers', value: '445+', label: 'Happy Customers' },
  { id: 'projects', value: '250+', label: 'Projects Completed' },
  { id: 'support', value: '24/7', label: 'Emergency Support' },
] as const;

export const WHY_CHOOSE_CARDS = [
  {
    id: 'experienced',
    title: 'Experienced Plumbing Service',
    description: 'Practical experience in handling everyday household plumbing problems.',
  },
  {
    id: 'workmanship',
    title: 'Quality Workmanship',
    description: 'Careful installation and repair work with attention to detail.',
  },
  {
    id: 'support',
    title: 'Reliable Customer Support',
    description: 'Clear communication and assistance throughout your service request.',
  },
  {
    id: 'satisfaction',
    title: 'Customer Satisfaction',
    description: 'Our priority is to provide a smooth and professional service experience.',
  },
] as const;

export const PLUMBING_SERVICES: ServiceItem[] = [
  {
    id: 'leak-detection',
    title: 'Leak Detection & Repair',
    description: 'Accurate detection and lasting repair of hidden and visible water leaks.',
    image: '/images/service-1-leak-detection.jpg',
    imageAlt: 'Plumber holding a handheld leak detection meter against a white tiled bathroom wall',
    width: 525,
    height: 349,
  },
  {
    id: 'water-pipe',
    title: 'Water Pipe Repair & Replacement',
    description: 'Fixing or replacing damaged, rusted and burst water pipes quickly.',
    image: '/images/service-2-water-pipe.jpg',
    imageAlt: 'Plumber using an adjustable wrench to tighten a leaking white water pipe coupling',
    width: 525,
    height: 349,
  },
  {
    id: 'new-pipeline',
    title: 'New Water Pipeline Installation',
    description: 'Complete planning and installation of new water supply lines.',
    image: '/images/service-3-new-pipeline.jpg',
    imageAlt: 'Plumber fitting white PVC water supply pipes and shutoff valves recessed in a cement wall',
    width: 525,
    height: 349,
  },
  {
    id: 'tap-faucet',
    title: 'Tap & Faucet Repair',
    description: 'Stop dripping taps and replace worn cartridges, washers and faucets.',
    image: '/images/service-4-tap-faucet.jpg',
    imageAlt: 'Plumber adjusting a chrome gooseneck sink faucet aerator with a wrench',
    width: 525,
    height: 349,
  },
  {
    id: 'bathroom-fittings',
    title: 'Bathroom Plumbing & Fittings',
    description: 'Professional installation of bathroom fittings, mixers and accessories.',
    image: '/images/service-5-bathroom-fittings.jpg',
    imageAlt: 'Chrome wall-mounted bathroom taps and three-bar towel rail installed on white tiles',
    width: 525,
    height: 349,
  },
  {
    id: 'kitchen-sink',
    title: 'Kitchen Plumbing & Sink Services',
    description: 'Sink installation, under-sink pipe work and kitchen drain repairs.',
    image: '/images/service-6-kitchen-sink.jpg',
    imageAlt: 'Plumber connecting waste drain pipes underneath a stainless steel kitchen sink',
    width: 525,
    height: 349,
  },
  {
    id: 'toilet-flush',
    title: 'Toilet & Flush Tank Services',
    description: 'Toilet installation, flush tank repair and leak-free seat fitting.',
    image: '/images/service-7-toilet-flush.jpg',
    imageAlt: 'Plumber hands adjusting a chrome flush valve assembly inside a white toilet bowl',
    width: 525,
    height: 348,
  },
  {
    id: 'wash-basin',
    title: 'Wash Basin Installation & Repair',
    description: 'Secure basin mounting, waste connections and leak repairs.',
    image: '/images/service-8-wash-basin.jpg',
    imageAlt: 'Two plumbers tightening drain trap fittings below a white wall-mounted wash basin',
    width: 525,
    height: 348,
  },
  {
    id: 'shower',
    title: 'Shower Installation & Repair',
    description: 'New shower fitting, mixer setup and low-pressure fixes.',
    image: '/images/service-9-shower.jpg',
    imageAlt: 'Plumber installing a chrome overhead rain shower and hand shower mixer on a bathroom wall',
    width: 525,
    height: 348,
  },
  {
    id: 'water-tank',
    title: 'Water Tank Installation & Connection',
    description: 'Overhead and underground tank setup with proper pipe connections.',
    image: '/images/service-10-water-tank.jpg',
    imageAlt: 'Plumber checking a metal supply pipe valve near a grey rooftop water storage tank',
    width: 525,
    height: 348,
  },
  {
    id: 'water-motor',
    title: 'Water Motor & Pump Services',
    description: 'Installation, repair and maintenance of water motors and pumps.',
    image: '/images/service-11-water-motor.jpg',
    imageAlt: 'Technician repairing a blue electric domestic water motor pump with a screwdriver',
    width: 525,
    height: 348,
  },
  {
    id: 'drainage',
    title: 'Drainage & Blockage Cleaning',
    description: 'Clearing clogged drains, sinks and sewer lines effectively.',
    image: '/images/service-12-drainage.jpg',
    imageAlt: 'Plumber feeding a steel drain auger rod into an open concrete floor drain',
    width: 525,
    height: 348,
  },
  {
    id: 'geyser',
    title: 'Geyser & Water Heater Services',
    description: 'Geyser installation, servicing and safe pipe connections.',
    image: '/images/service-13-geyser.jpg',
    imageAlt: 'Plumber tightening brass and chrome inlet-outlet pipe fittings below a white wall-mounted geyser',
    width: 525,
    height: 349,
  },
  {
    id: 'emergency',
    title: 'Emergency Plumbing Services',
    description: '24/7 rapid response for bursts, floods and urgent plumbing issues.',
    image: '/images/service-14-emergency.jpg',
    imageAlt: 'Plumber in an orange vest shutting off a spraying burst pipe valve beside a toolbox at night',
    width: 525,
    height: 349,
  },
];

export const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'installation',
    title: 'Installation & Replacement',
    description:
      'Need new plumbing installation or replacement? We provide reliable solutions for water pipes, fittings, water heaters and pump installations. Our focus is on proper connections, quality workmanship and a clean, professional finish.',
    targetServiceId: 'new-pipeline',
  },
  {
    id: 'drain-sewer',
    title: 'Drain & Sewer Services',
    description:
      'Having drainage or sewer problems? We provide reliable drainage installation, sewer line repairs and replacement solutions to help keep your plumbing system working smoothly.',
    targetServiceId: 'drainage',
  },
  {
    id: 'new-construction',
    title: 'New Construction & Remodeling',
    description:
      'Building a new home or renovating your bathroom or kitchen? We provide reliable plumbing installation, complete home re-piping and remodeling plumbing solutions to meet your needs.',
    targetServiceId: 'bathroom-fittings',
  },
  {
    id: 'maintenance',
    title: 'Comprehensive Plumbing Maintenance & Inspection Programs',
    description:
      'Keep your plumbing system in good condition with regular inspections and preventive maintenance. We help identify potential plumbing issues early, maintain proper water flow and reduce the risk of unexpected repairs.',
    targetServiceId: 'leak-detection',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Contact Us',
    description: 'Call or WhatsApp us and explain your plumbing problem.',
  },
  {
    number: '02',
    title: 'Understand Your Problem',
    description: 'We discuss your requirements and identify the service you need.',
  },
  {
    number: '03',
    title: 'Service Estimate',
    description: 'Get information about the required work and applicable charges before proceeding.',
  },
  {
    number: '04',
    title: 'Professional Plumbing Work',
    description: 'Get your plumbing work completed with proper attention and care.',
  },
  {
    number: '05',
    title: 'Final Inspection',
    description: 'Check the completed work and make sure the agreed service requirements have been addressed.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What plumbing services do you provide?',
    answer:
      'We provide household plumbing services including leak repairs, pipe repairs, bathroom fittings, kitchen plumbing, water motor services, drainage cleaning and more.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We provide plumbing services across 32 localities in Patna, including Khajpura, Jagdeo Path, Bailey Road, Boring Road, Kankarbagh, Raja Bazar, Danapur, Ashiana Nagar, Anisabad, Rajendra Nagar, Beur, Phulwari Sharif, Gardanibagh, Mithapur, Sipara, Chitkohra Chawal Bazar, Bitaura, Tej Pratap Nagar, and nearby Patna areas.',
  },
  {
    question: 'How can I request a plumbing service?',
    answer: 'You can contact us through Call or WhatsApp to discuss your plumbing requirements.',
  },
  {
    question: 'Do you provide emergency plumbing assistance?',
    answer: 'Contact us to check emergency plumbing service availability.',
  },
  {
    question: 'Can I get an estimate before the work starts?',
    answer:
      'Contact us with your requirements to discuss the estimated service charges before work begins.',
  },
  {
    question: 'How can I contact FIXIT PLUMBER?',
    answer:
      'You can contact us through the Call Now and WhatsApp buttons available on our website.',
  },
];

export const CONTACT_BULLETS = [
  '12+ Years of Practical Experience',
  'Professional Plumbing Services',
  'Reliable Repair Solutions',
  'Quality Workmanship',
  'Customer Satisfaction',
  'Easy WhatsApp Service Request',
  'Emergency Plumbing Support',
];

export const HOME_SERVICE_AREAS = [
  'Khajpura',
  'Jagdeo Path',
  'Bailey Road',
  'Boring Road',
  'Kankarbagh',
  'Raja Bazar',
  'Danapur',
  'Ashiana Nagar',
  'Anisabad',
  'Rajendra Nagar',
  'Patna',
  'Beur',
  'Phulwari Sharif',
  'Gardanibagh',
  'Mithapur',
  'Sipara',
  'Gola Road',
  'Saguna More',
  'Digha',
  'Boring Canal Road',
  'Jakkanpur',
  'Sheikhpura',
  'Gandhi Maidan',
  'Rupaspur',
  'Chitkohra Chawal Bazar',
  'Khagaul',
  'Rukanpura',
  'Tej Pratap Nagar',
  'Bitaura',
  'Hasanpura',
  'Dasratha',
  'Lohia Nagar',
] as const;

export const FOOTER_SERVICES = [
  { label: 'Leak Detection & Repair', id: 'leak-detection' },
  { label: 'Water Pipe Repair', id: 'water-pipe' },
  { label: 'Bathroom Plumbing', id: 'bathroom-fittings' },
  { label: 'Kitchen Plumbing', id: 'kitchen-sink' },
  { label: 'Toilet & Flush Tank Services', id: 'toilet-flush' },
  { label: 'Water Motor & Pump Services', id: 'water-motor' },
  { label: 'Drainage & Blockage Cleaning', id: 'drainage' },
];
