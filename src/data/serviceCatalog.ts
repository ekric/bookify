export type ServiceType = 'hair' | 'auto' | 'wellness' | 'it' | 'pet' | 'dental' | 'massage' | 'fitness' | 'legal';

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface ServiceCategory {
  id: string;
  label: string;
  services: Service[];
}

const SERVICE_CATALOG: Record<ServiceType, ServiceCategory[]> = {
  hair: [
    {
      id: 'women',
      label: 'Women',
      services: [
        { id: 'women-1', name: 'Haircut & Styling', duration: '60 min', price: 45 },
        { id: 'women-2', name: 'Color Treatment', duration: '90 min', price: 80 }
      ]
    },
    {
      id: 'men',
      label: 'Men',
      services: [
        { id: 'men-1', name: 'Classic Haircut', duration: '30 min', price: 25 },
        { id: 'men-2', name: 'Beard Trim', duration: '20 min', price: 18 }
      ]
    },
    {
      id: 'kids',
      label: 'Kids',
      services: [
        { id: 'kids-1', name: 'Kids Haircut', duration: '20 min', price: 15 }
      ]
    }
  ],
  auto: [
    {
      id: 'maintenance',
      label: 'Maintenance',
      services: [
        { id: 'auto-1', name: 'Oil Change', duration: '45 min', price: 70 },
        { id: 'auto-2', name: 'Brake Inspection', duration: '60 min', price: 90 }
      ]
    },
    {
      id: 'repair',
      label: 'Repair',
      services: [
        { id: 'auto-3', name: 'Engine Diagnostics', duration: '75 min', price: 120 }
      ]
    }
  ],
  wellness: [
    {
      id: 'spa',
      label: 'Spa',
      services: [
        { id: 'wellness-1', name: 'Full Body Massage', duration: '60 min', price: 65 },
        { id: 'wellness-2', name: 'Facial Treatment', duration: '50 min', price: 55 }
      ]
    },
    {
      id: 'relaxation',
      label: 'Relaxation',
      services: [
        { id: 'wellness-3', name: 'Aromatherapy Session', duration: '45 min', price: 50 }
      ]
    }
  ],
  it: [
    {
      id: 'support',
      label: 'IT Support',
      services: [
        { id: 'it-1', name: 'Computer Repair', duration: '60 min', price: 75 },
        { id: 'it-2', name: 'Software Installation', duration: '45 min', price: 55 }
      ]
    },
    {
      id: 'network',
      label: 'Network',
      services: [
        { id: 'it-3', name: 'Home Network Setup', duration: '90 min', price: 120 }
      ]
    }
  ],
  pet: [
    {
      id: 'grooming',
      label: 'Grooming',
      services: [
        { id: 'pet-1', name: 'Full Pet Grooming', duration: '90 min', price: 80 },
        { id: 'pet-2', name: 'Nail Trimming', duration: '20 min', price: 20 }
      ]
    },
    {
      id: 'care',
      label: 'Care',
      services: [
        { id: 'pet-3', name: 'Pet Wellness Check', duration: '40 min', price: 45 }
      ]
    }
  ],
  dental: [
    {
      id: 'checkup',
      label: 'Dental Care',
      services: [
        { id: 'dental-1', name: 'Dental Checkup', duration: '30 min', price: 55 },
        { id: 'dental-2', name: 'Teeth Cleaning', duration: '45 min', price: 75 }
      ]
    },
    {
      id: 'whitening',
      label: 'Whitening',
      services: [
        { id: 'dental-3', name: 'Teeth Whitening', duration: '60 min', price: 120 }
      ]
    }
  ],
  massage: [
    {
      id: 'therapy',
      label: 'Therapy',
      services: [
        { id: 'massage-1', name: 'Deep Tissue Massage', duration: '60 min', price: 70 },
        { id: 'massage-2', name: 'Hot Stone Massage', duration: '60 min', price: 75 }
      ]
    },
    {
      id: 'relief',
      label: 'Pain Relief',
      services: [
        { id: 'massage-3', name: 'Sports Massage', duration: '50 min', price: 65 }
      ]
    }
  ],
  fitness: [
    {
      id: 'training',
      label: 'Training',
      services: [
        { id: 'fitness-1', name: 'Personal Training', duration: '60 min', price: 60 },
        { id: 'fitness-2', name: 'Small Group Session', duration: '45 min', price: 35 }
      ]
    },
    {
      id: 'assessment',
      label: 'Assessment',
      services: [
        { id: 'fitness-3', name: 'Fitness Assessment', duration: '30 min', price: 40 }
      ]
    }
  ],
  legal: [
    {
      id: 'consultation',
      label: 'Consultation',
      services: [
        { id: 'legal-1', name: 'Legal Consultation', duration: '45 min', price: 120 },
        { id: 'legal-2', name: 'Contract Review', duration: '60 min', price: 150 }
      ]
    },
    {
      id: 'representation',
      label: 'Representation',
      services: [
        { id: 'legal-3', name: 'Court Representation', duration: '120 min', price: 300 }
      ]
    }
  ]
};

export const getServiceCategoriesForType = (type: ServiceType): ServiceCategory[] => {
  return SERVICE_CATALOG[type] || [];
};

export const getServiceDetailsByType = (type: ServiceType, serviceIds: string[]): Service[] => {
  const services: Service[] = [];
  getServiceCategoriesForType(type).forEach((category) => {
    services.push(...category.services);
  });

  return services.filter((service) => serviceIds.includes(service.id));
};

export const getServiceById = (serviceId: string): Service | undefined => {
  const services: Service[] = [];

  Object.values(SERVICE_CATALOG).forEach((categories) => {
    categories.forEach((category) => {
      services.push(...category.services);
    });
  });

  return services.find((service) => service.id === serviceId);
};
