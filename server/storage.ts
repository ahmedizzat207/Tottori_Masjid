import {
  User,
  InsertUser,
  Event,
  InsertEvent,
  GalleryImage,
  InsertGalleryImage,
  Service,
  InsertService,
  ContactSubmission,
  InsertContactSubmission,
  Donation,
  InsertDonation,
  PrayerConfig,
  InsertPrayerConfig
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Prayer Config methods
  getPrayerConfig(): Promise<PrayerConfig | undefined>;
  updatePrayerConfig(config: InsertPrayerConfig): Promise<PrayerConfig>;
  
  // Event methods
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Gallery methods
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: number): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: number): Promise<boolean>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Contact submission methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Donation methods
  createDonation(donation: InsertDonation): Promise<Donation>;
  getAllDonations(): Promise<Donation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private prayerConfig: PrayerConfig | undefined;
  private events: Map<number, Event>;
  private galleryImages: Map<number, GalleryImage>;
  private services: Map<number, Service>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private donations: Map<number, Donation>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentGalleryImageId: number;
  private currentServiceId: number;
  private currentContactSubmissionId: number;
  private currentDonationId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.galleryImages = new Map();
    this.services = new Map();
    this.contactSubmissions = new Map();
    this.donations = new Map();
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentGalleryImageId = 1;
    this.currentServiceId = 1;
    this.currentContactSubmissionId = 1;
    this.currentDonationId = 1;
    
    // Initialize with default prayer config
    this.prayerConfig = {
      id: 1,
      calculationMethod: "MWL",
      asrJuristic: "Standard",
      adjustHighLats: "AngleBased",
      timeFormat: "24h"
    };
    
    // Populate with some initial services
    this.initializeDefaultData();
  }
  
  private initializeDefaultData() {
    // Add default services
    const defaultServices: InsertService[] = [
      {
        title: "Friday Prayer (Jumu'ah)",
        description: "Weekly congregational prayer that replaces the Dhuhr prayer on Fridays.",
        imageUrl: "/images/services/friday-prayer.svg",
        dayOfWeek: "Friday",
        time: "13:30",
        featured: true
      },
      {
        title: "Quran Classes",
        description: "Learn to read and understand the Quran with qualified instructors.",
        imageUrl: "/images/services/quran-class.svg",
        dayOfWeek: "Saturday, Sunday",
        time: "10:00 - 12:00",
        featured: true
      },
      {
        title: "Islamic Studies",
        description: "Comprehensive courses on Islamic history, principles, and practices.",
        imageUrl: "/images/services/islamic-studies.svg",
        dayOfWeek: "Wednesday",
        time: "19:00 - 21:00",
        featured: true
      }
    ];
    
    defaultServices.forEach(service => this.createService(service));
    
    // Add upcoming events
    const now = new Date();
    const defaultEvents: InsertEvent[] = [
      {
        title: "Eid Prayer",
        description: "Join us for the blessed Eid prayer followed by community breakfast.",
        location: "Tottori Masjid Main Hall",
        startDateTime: new Date(now.getFullYear(), now.getMonth() + 1, 15, 7, 30),
        endDateTime: new Date(now.getFullYear(), now.getMonth() + 1, 15, 9, 30),
        imageUrl: "/images/events/eid-prayer.svg",
        recurring: false
      },
      {
        title: "Community Iftar",
        description: "Community iftar dinner during Ramadan. All are welcome to join.",
        location: "Tottori Masjid Dining Hall",
        startDateTime: new Date(now.getFullYear(), now.getMonth() + 1, 5, 18, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth() + 1, 5, 20, 0),
        imageUrl: "/images/events/iftar.svg", 
        recurring: false
      },
      {
        title: "Islamic New Year Celebration",
        description: "Celebrating the Islamic New Year with lectures and special programs.",
        location: "Tottori Masjid Conference Room",
        startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 19, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 21, 30),
        imageUrl: "/images/events/islamic-new-year.svg",
        recurring: false
      }
    ];
    
    defaultEvents.forEach(event => this.createEvent(event));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Prayer Config methods
  async getPrayerConfig(): Promise<PrayerConfig | undefined> {
    return this.prayerConfig;
  }
  
  async updatePrayerConfig(config: InsertPrayerConfig): Promise<PrayerConfig> {
    this.prayerConfig = { ...config, id: 1 };
    return this.prayerConfig;
  }
  
  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => {
      return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
    });
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const newEvent: Event = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }
  
  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;
    
    const updatedEvent = { ...existingEvent, ...event };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }
  
  // Gallery methods
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).sort((a, b) => {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });
  }
  
  async getGalleryImage(id: number): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }
  
  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentGalleryImageId++;
    const newImage: GalleryImage = { ...image, id, uploadDate: new Date() };
    this.galleryImages.set(id, newImage);
    return newImage;
  }
  
  async updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const existingImage = this.galleryImages.get(id);
    if (!existingImage) return undefined;
    
    const updatedImage = { ...existingImage, ...image };
    this.galleryImages.set(id, updatedImage);
    return updatedImage;
  }
  
  async deleteGalleryImage(id: number): Promise<boolean> {
    return this.galleryImages.delete(id);
  }
  
  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }
  
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;
    
    const updatedService = { ...existingService, ...service };
    this.services.set(id, updatedService);
    return updatedService;
  }
  
  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }
  
  // Contact submission methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const newSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      submittedAt: new Date(),
      responded: false
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
  }
  
  // Donation methods
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    const newDonation: Donation = {
      ...donation,
      id,
      donatedAt: new Date()
    };
    this.donations.set(id, newDonation);
    return newDonation;
  }
  
  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values()).sort((a, b) => {
      return new Date(b.donatedAt).getTime() - new Date(a.donatedAt).getTime();
    });
  }
}

export const storage = new MemStorage();
