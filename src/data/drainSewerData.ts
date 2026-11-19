export interface DrainSewerFeatureItem {
  id: 'accumulation' | 'flow' | 'timely' | 'workmanship' | 'residential';
  title: string;
  description: string;
}

export const DRAIN_SEWER_INTRO_PARAGRAPHS = [
  'A properly working drainage and sewer system helps keep your home clean, hygienic and free from wastewater problems. Blocked drainage, damaged pipes or leaking sewer lines can cause unpleasant odours, water accumulation and inconvenience.',
  "FIXIT PLUMBER provides drainage and sewer plumbing solutions in Patna, Bihar, with a focus on proper pipe installation, repair and replacement according to your property's requirements.",
];

export const DRAINAGE_INSTALLATION_DATA = {
  mainTitleLine1: 'Drainage System Installation',
  mainTitleLine2: 'Service',
  image: '/images/ds-drainage-installation.jpg',
  imageAlt: 'Two plumbers fitting grey and white PVC drainage pipes to a floor drain trap in a trench',
  subHeadingLine1: 'Bathroom, Kitchen & Household',
  subHeadingLine2: 'Drainage Pipelines',
  paragraphs: [
    'A well-installed drainage system allows wastewater to flow away from your property efficiently. Incorrect pipe connections or poor drainage arrangements can lead to slow water flow, blockages and water accumulation.',
    'FIXIT PLUMBER provides drainage system installation for residential properties, including suitable drainage pipelines and connections for bathrooms, kitchens and other required areas.',
  ],
  includesTitle: 'What This Service Includes:',
  bullets: [
    'New drainage pipeline installation',
    'Proper drainage pipe fitting and connections',
    'Bathroom and kitchen drainage arrangements',
    'Wastewater flow solutions',
    'Replacement of unsuitable or damaged drainage pipes, where required',
  ],
  captionTitle: 'Expert Drainage System Installation Service',
  captionNote:
    "Our focus is to provide a suitable drainage arrangement based on your property's layout and plumbing needs.",
};

export const SEWER_REPAIR_DATA = {
  mainTitleLine1: 'Sewer Line Repair & Replacement',
  mainTitleLine2: 'Service',
  image: '/images/ds-sewer-repair.jpg',
  imageAlt: 'Plumber kneeling beside an open floor drain pit tightening a metal sewer pipe coupling',
  subHeadingLine1: 'Damaged & Leaking Sewer',
  subHeadingLine2: 'Pipe Solutions',
  paragraphs: [
    'A damaged or leaking sewer line can lead to wastewater leakage, unpleasant smells and drainage problems. Timely repair or replacement can help prevent further plumbing damage and restore proper wastewater flow.',
    'FIXIT PLUMBER provides sewer line repair and replacement solutions for residential properties in Patna. We assess the reported problem and recommend suitable work based on the condition of the existing sewer pipeline.',
  ],
  includesTitle: 'What This Service Includes:',
  bullets: [
    'Repair of damaged sewer pipes',
    'Replacement of old or damaged sewer lines',
    'Solutions for leaking sewer pipelines',
    'Sewer pipe connection work',
    'Checking drainage flow after completed work, where applicable',
  ],
  captionTitle: 'Expert Sewer Line Repair & Replacement Service',
  captionNote: 'Repair of damaged sewer lines. Replacement of old or damaged sewer pipelines.',
};

export const WHY_CHOOSE_DRAIN_SEWER_ITEMS: DrainSewerFeatureItem[] = [
  {
    id: 'accumulation',
    title: 'Prevents Water Accumulation',
    description:
      'Proper drainage directs water away from your home, helping prevent pooling, dampness and potential damage to foundations and surfaces.',
  },
  {
    id: 'flow',
    title: 'Smooth Water Flow',
    description:
      'Professional installation with correct slopes and secure connections supports consistent, efficient water flow throughout your system.',
  },
  {
    id: 'timely',
    title: 'Timely Sewer Line Repairs',
    description:
      'Addressing sewer line damage early helps prevent bigger plumbing problems, costly backups and disruption to your household.',
  },
  {
    id: 'workmanship',
    title: 'Quality Workmanship & Careful Inspection',
    description:
      'Thorough inspection and attention to detail ensure every job is done right, delivering durable results you can depend on.',
  },
  {
    id: 'residential',
    title: 'Reliable Residential Solutions',
    description:
      'From new drainage connections to sewer pipeline replacement, we provide dependable solutions tailored to residential needs.',
  },
];
