export interface NewConstructionServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface NewConstructionFeatureCard {
  id: 'planning' | 'reliable' | 'careful' | 'remodeling' | 'inspection';
  title: string;
  description: string;
}

export const NEW_CONSTRUCTION_SERVICES: NewConstructionServiceCard[] = [
  {
    id: 'new-construction-plumbing',
    title: 'New Construction Plumbing',
    description:
      'Professional plumbing installation for new residential construction, including water supply pipelines, drainage connections and complete plumbing setup.',
    image: '/images/nc-new-construction.jpg',
    imageAlt: 'White PVC plumbing pipelines mounted vertically and horizontally along an exposed brick construction wall',
  },
  {
    id: 'full-home-re-piping',
    title: 'Full Home Re-Piping',
    description:
      'Replacement of old, damaged or outdated water pipelines throughout the home with properly installed new plumbing pipes.',
    image: '/images/nc-full-repipe.jpg',
    imageAlt: 'White water supply pipes chased into a grey plastered wall alongside grey vertical drainage pipes',
  },
  {
    id: 'remodeling-plumbing',
    title: 'Remodeling Plumbing',
    description:
      'Plumbing installation, modifications and replacement work for bathroom and kitchen remodeling projects.',
    image: '/images/nc-remodeling.jpg',
    imageAlt: 'Plumber in navy overalls aligning a white ceramic bathroom wash basin and chrome faucet',
  },
];

export const NEW_CONSTRUCTION_WHY_CARDS: NewConstructionFeatureCard[] = [
  {
    id: 'planning',
    title: 'Proper Planning for New Construction',
    description:
      'We plan pipe routes, water supply and drainage layouts carefully before installation begins.',
  },
  {
    id: 'reliable',
    title: 'Reliable Water Pipeline Installation',
    description:
      'Water supply lines are installed neatly with secure fittings for steady, dependable flow.',
  },
  {
    id: 'careful',
    title: 'Careful Pipe Replacement & Connections',
    description:
      'Old pipes are removed with care and new lines are connected properly throughout the home.',
  },
  {
    id: 'remodeling',
    title: 'Bathroom & Kitchen Remodeling Solutions',
    description:
      'We install, modify and replace plumbing to suit your new bathroom or kitchen layout.',
  },
  {
    id: 'inspection',
    title: 'Quality Workmanship & Final Inspection',
    description:
      'Every job is completed with attention to detail and checked thoroughly before handover.',
  },
];
