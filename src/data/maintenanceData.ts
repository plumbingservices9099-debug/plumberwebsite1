export interface MaintenanceServiceCard {
  id: string;
  bordered?: boolean;
  smallerPhoto?: boolean;
  titleLine1: string;
  titleLine2: string;
  subtitleLine1: string;
  subtitleLine2: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  paragraphTone: 'slate-blue' | 'dark';
  checklistTitle: string;
  bullets: string[];
}

export const MAINTENANCE_INTRO_PARAGRAPHS = [
  "Regular plumbing maintenance helps identify common problems before they become costly repairs. From leaking pipes to drainage issues, timely inspections can help keep your home's plumbing system working properly.",
  'FIXIT PLUMBER provides plumbing maintenance and inspection services in Patna, Bihar, for residential and commercial properties.',
];

export const MAINTENANCE_CARDS: MaintenanceServiceCard[] = [
  {
    id: 'annual-plumbing-checkup',
    bordered: true,
    titleLine1: 'Annual Plumbing',
    titleLine2: 'Checkup',
    subtitleLine1: 'Annual Plumbing Inspection',
    subtitleLine2: 'for Your Property',
    image: '/images/pm-annual-checkup.jpg',
    imageAlt: 'Plumber inspecting a chrome bottle trap below a white wall-mounted wash basin beside a black tool case',
    paragraphs: [
      'A regular plumbing checkup helps identify visible leaks, damaged connections and common drainage problems. Our inspection focuses on important plumbing areas to help you understand the condition of your system.',
    ],
    paragraphTone: 'slate-blue',
    checklistTitle: 'What We Check:',
    bullets: [
      'Visible water pipe connections',
      'Taps and bathroom fittings',
      'Kitchen and bathroom drainage',
      'Toilet and flush connections',
      'Accessible water supply pipes',
    ],
  },
  {
    id: 'preventive-maintenance-plans',
    titleLine1: 'Preventive',
    titleLine2: 'Maintenance Plans',
    subtitleLine1: 'Preventive Plumbing',
    subtitleLine2: 'Maintenance Solutions',
    image: '/images/pm-preventive-plans.jpg',
    imageAlt: 'Gloved plumbing technician tightening exposed stainless steel pipe fittings on a wall with a wrench',
    paragraphs: [
      'Small plumbing issues can become bigger problems when left unattended. Preventive maintenance focuses on checking important plumbing components at planned intervals and identifying concerns that may need attention.',
    ],
    paragraphTone: 'slate-blue',
    checklistTitle: 'Maintenance Includes:',
    bullets: [
      'Scheduled plumbing checks',
      'Inspection of common leakage points',
      'Checking water supply connections',
      'Reviewing drainage performance',
      'Recommendations for necessary repairs',
    ],
  },
  {
    id: 'seasonal-maintenance',
    titleLine1: 'Seasonal',
    titleLine2: 'Maintenance',
    subtitleLine1: 'Seasonal Plumbing',
    subtitleLine2: 'Inspection & Maintenance',
    image: '/images/pm-seasonal-maintenance.jpg',
    imageAlt: 'Plumbing inspector holding a clipboard while checking vertical pipeline risers and shutoff valves',
    paragraphs: [
      'Changing weather conditions can affect exposed pipes, drainage connections and water supply systems. Seasonal maintenance helps identify plumbing concerns that may need attention during different times of the year.',
    ],
    paragraphTone: 'dark',
    checklistTitle: 'Seasonal Checks Include:',
    bullets: [
      'Inspection of accessible exposed pipes',
      'Checking drainage outlets',
      'Checking visible leaks and loose connections',
      'Water tank and supply connection checks',
      'Identifying seasonal plumbing concerns',
    ],
  },
  {
    id: 'commercial-maintenance-contracts',
    bordered: true,
    smallerPhoto: true,
    titleLine1: 'Commercial',
    titleLine2: 'Maintenance Contracts',
    subtitleLine1: 'Commercial Plumbing',
    subtitleLine2: 'Maintenance for Businesses',
    image: '/images/pm-commercial-contracts.jpg',
    imageAlt: 'Plumber in a blue hard hat adjusting commercial pipes near a yellow toolbox and maintenance sign',
    paragraphs: [
      'Offices, shops and commercial properties depend on properly functioning plumbing systems for their daily operations. Regular maintenance can help identify plumbing issues and reduce unexpected interruptions.',
      'FIXIT PLUMBER provides commercial plumbing maintenance arrangements based on property requirements and mutually agreed service schedules.',
    ],
    paragraphTone: 'slate-blue',
    checklistTitle: 'Maintenance Includes:',
    bullets: [
      'Routine plumbing inspections',
      'Water supply connection checks',
      'Washroom and bathroom plumbing checks',
      'Drainage system inspection',
      'Identification of repair requirements',
    ],
  },
];
