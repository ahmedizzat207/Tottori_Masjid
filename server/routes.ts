import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertEventSchema, 
  insertGalleryImageSchema, 
  insertServiceSchema, 
  insertContactSubmissionSchema,
  insertDonationSchema,
  insertPrayerConfigSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Prayer Config Routes
  app.get("/api/prayer-config", async (_req, res) => {
    try {
      const config = await storage.getPrayerConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prayer configuration" });
    }
  });

  app.post("/api/prayer-config", async (req, res) => {
    try {
      const validatedData = insertPrayerConfigSchema.parse(req.body);
      const updatedConfig = await storage.updatePrayerConfig(validatedData);
      res.json(updatedConfig);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid prayer configuration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update prayer configuration" });
      }
    }
  });

  // Event Routes
  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const newEvent = await storage.createEvent(validatedData);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create event" });
      }
    }
  });

  app.put("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const validatedData = insertEventSchema.partial().parse(req.body);
      const updatedEvent = await storage.updateEvent(id, validatedData);
      
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(updatedEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update event" });
      }
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const success = await storage.deleteEvent(id);
      if (!success) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // Gallery Routes
  app.get("/api/gallery", async (_req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid image ID" });
      }
      
      const image = await storage.getGalleryImage(id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      res.json(image);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery image" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const newImage = await storage.createGalleryImage(validatedData);
      res.status(201).json(newImage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid gallery image data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create gallery image" });
      }
    }
  });

  app.put("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid image ID" });
      }
      
      const validatedData = insertGalleryImageSchema.partial().parse(req.body);
      const updatedImage = await storage.updateGalleryImage(id, validatedData);
      
      if (!updatedImage) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      res.json(updatedImage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid gallery image data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update gallery image" });
      }
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid image ID" });
      }
      
      const success = await storage.deleteGalleryImage(id);
      if (!success) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery image" });
    }
  });

  // Service Routes
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const newService = await storage.createService(validatedData);
      res.status(201).json(newService);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid service data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create service" });
      }
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const updatedService = await storage.updateService(id, validatedData);
      
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(updatedService);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid service data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update service" });
      }
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const success = await storage.deleteService(id);
      if (!success) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Contact Submission Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const newSubmission = await storage.createContactSubmission(validatedData);
      res.status(201).json(newSubmission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact submission data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create contact submission" });
      }
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  // Donation Routes
  app.post("/api/donations", async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      const newDonation = await storage.createDonation(validatedData);
      res.status(201).json(newDonation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid donation data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to process donation" });
      }
    }
  });

  app.get("/api/donations", async (_req, res) => {
    try {
      const donations = await storage.getAllDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
