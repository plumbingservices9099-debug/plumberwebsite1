export interface InstallationServiceSection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  bullets: string[];
  caption: string;
}

export interface ExpertTipCard {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface ExpertApproachCard {
  id: 'approach' | 'inspection' | 'workmanship' | 'communication' | 'customer' | 'reliable';
  title: string;
  description: string;
}

export interface InstallationProcessStep {
  number: string;
  icon: 'phone' | 'search' | 'wrench' | 'check';
  title: string;
  description: string;
}

export const INSTALLATION_SERVICES: InstallationServiceSection[] = [
  {
    id: 'pipe-installation',
    title: 'Pipe Installation & Replacement',
    subtitle: 'Water Pipe Installation & Pipeline Replacement',
    image: '/images/ir-pipe-installation.jpg',
    imageAlt: 'Plumber in blue overalls tightening a valve fitting on copper water supply pipes',
    paragraphs: [
      "Damaged, leaking or outdated water pipes can affect your home's water supply and cause unnecessary water wastage. FIXIT PLUMBER provides water pipe installation and replacement services to help maintain reliable plumbing connections.",
      "Whether you need a new pipeline for a home renovation, a replacement for damaged pipes or additional water connections, we work according to your property's plumbing requirements.",
    ],
    bullets: [
      'New water pipeline installation',
      'Replacement of damaged or leaking pipes',
      'Proper pipe fitting and connections',
      'Improved water distribution',
      'Suitable plumbing solutions for residential properties',
    ],
    caption:
      'Professional water pipe installation, replacement of damaged and leaking pipes, and residential water pipeline solutions.',
  },
  {
    id: 'water-heater-services',
    title: 'Water Heater Services',
    subtitle: 'Water Heater Setup & Pipe Connections',
    image: '/images/ir-water-heater.jpg',
    imageAlt: 'Technician connecting braided steel inlet and outlet pipes under a wall-mounted digital water heater',
    paragraphs: [
      'A properly installed water heater helps provide convenient hot water for everyday household needs. FIXIT PLUMBER offers water heater installation and replacement assistance, with attention to plumbing connections and the requirements of your space.',
      'Whether you are installing a new water heater or replacing an existing unit, proper inlet and outlet connections are important for dependable operation.',
    ],
    bullets: [
      'Water heater plumbing connections',
      'Installation and replacement assistance',
      'Proper inlet and outlet pipe fitting',
      'Careful checking of water connections',
      'Neat and organised installation',
    ],
    caption:
      'Water heater installation and replacement, including water connections and related plumbing work.',
  },
  {
    id: 'sump-pump-installation',
    title: 'Sump Pump Installation',
    subtitle: 'Sump Pump Setup & Drainage Connections',
    image: '/images/ir-sump-pump.jpg',
    imageAlt: 'Technician adjusting a valve on a floor-mounted pump connected to stainless steel manifold pipes',
    paragraphs: [
      'Unwanted water accumulation in basements and low-lying areas can create problems for a property. A suitable sump pump system helps collect and remove accumulated water through a connected drainage arrangement.',
      'FIXIT PLUMBER provides sump pump installation, replacement, and pipe connection services based on site conditions, drainage requirements and the plumbing setup needed for your property.',
    ],
    bullets: [
      'Sump pump installation and replacement services',
      'Suitable drainage pipe connections',
      'Solutions for water accumulation areas',
      'Proper positioning and plumbing connections',
      'Setup and servicing based on site requirements',
    ],
    caption:
      'Sump pump installation, pump pipe connection and plumbing services, and replacement of existing sump pumps.',
  },
  {
    id: 'heat-pump-installation',
    title: 'Heat Pump Installation & Replacement',
    subtitle: 'Heat Pump Plumbing & Water Line Connections',
    image: '/images/ir-heat-pump.jpg',
    imageAlt: 'Copper pipes and brass valve fittings connected beneath a wall-mounted heat pump unit',
    paragraphs: [
      'Heat pump systems require suitable planning and correctly arranged plumbing connections. FIXIT PLUMBER can assist with the plumbing aspects of heat pump installation or replacement, depending on the system type and service requirements.',
      'Our focus is on appropriate water connections, pipe fitting and an organised installation process. Specialised electrical work and technical heat pump servicing should be completed by qualified professionals.',
    ],
    bullets: [
      'Plumbing connection assistance',
      'Suitable water pipe fitting',
      'Installation support based on system requirements',
      'Careful checking of plumbing connections',
      'Organised installation and replacement work',
    ],
    caption:
      'Plumbing support for heat pump installation and replacement, covering the related water connections and setup.',
  },
];

export const EXPERT_TIPS: ExpertTipCard[] = [
  {
    id: 'pipes-tip',
    image: '/images/ir-tip-pipes.jpg',
    imageAlt: 'Corroded galvanized metal water pipe flange with visible rust streaks',
    title: 'Signs That Your Water Pipes Need Replacement',
    description:
      'Frequent leaks, visible corrosion, cracked or damaged sections and a noticeable drop in water flow are common signs that pipes are wearing out. Addressing them early helps avoid water damage and repeated repair costs.',
  },
  {
    id: 'heater-tip',
    image: '/images/ir-tip-heater.jpg',
    imageAlt: 'White cylindrical wall-mounted storage water heater with copper inlet and outlet pipes',
    title: 'What to Consider Before Installing a Water Heater',
    description:
      'Choosing the right capacity for your household, planning a suitable location and ensuring proper plumbing connections all affect performance. Professional installation helps the unit run safely and efficiently.',
  },
  {
    id: 'sump-tip',
    image: '/images/ir-tip-sump.jpg',
    imageAlt: 'Submersible sump pump inside a concrete pit connected to white PVC discharge pipes',
    title: 'Why Proper Sump Pump Installation Is Important',
    description:
      'A correctly installed sump pump with secure drainage connections moves unwanted water away from your property. This helps reduce the risk of water accumulation in basements and low-lying areas.',
  },
];

export const EXPERT_APPROACH_CARDS: ExpertApproachCard[] = [
  {
    id: 'approach',
    title: 'PROFESSIONAL APPROACH',
    description:
      'Every job is planned and carried out in an organized, respectful way, from arrival to cleanup.',
  },
  {
    id: 'inspection',
    title: 'CAREFUL INSPECTION',
    description:
      'We check connections, fittings and flow before and after installation to catch issues early.',
  },
  {
    id: 'workmanship',
    title: 'QUALITY WORKMANSHIP',
    description:
      'Secure fittings and neat, precise pipework built to perform well day after day.',
  },
  {
    id: 'communication',
    title: 'CLEAR COMMUNICATION',
    description:
      'We explain the work, your options and next steps in plain language, so you always know what to expect.',
  },
  {
    id: 'customer',
    title: 'CUSTOMER-FOCUSED SERVICE',
    description:
      'Solutions are tailored to your home, your needs and your schedule, with care for your space.',
  },
  {
    id: 'reliable',
    title: 'RELIABLE PLUMBING SOLUTIONS',
    description:
      'Dependable installations and replacements designed to keep water flowing as it should.',
  },
];

export const SERVICE_APPROACH_STEPS = [
  'Understand Your Requirements: We discuss the plumbing work and identify the installation or replacement needs.',
  'Check the Site: We consider the existing plumbing arrangement and available space.',
  'Plan the Work: We identify suitable pipe connections and installation requirements.',
  'Complete the Installation: We carry out the agreed plumbing work with attention to fitting and connections.',
  'Final Checking: We check the completed plumbing connections for visible leakage and proper water flow, where applicable.',
];

export const INSTALLATION_PROCESS_STEPS: InstallationProcessStep[] = [
  {
    number: '01',
    icon: 'phone',
    title: 'Contact Us',
    description: 'The customer contacts FIXIT PLUMBER.',
  },
  {
    number: '02',
    icon: 'search',
    title: 'Problem Inspection',
    description: 'Understand the installation or replacement requirement.',
  },
  {
    number: '03',
    icon: 'wrench',
    title: 'Installation & Replacement',
    description: 'Carry out the agreed plumbing work.',
  },
  {
    number: '04',
    icon: 'check',
    title: 'Final Inspection',
    description: 'Check the completed work and connections.',
  },
];
