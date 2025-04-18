import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Prayer Time Configuration
export const prayerConfig = pgTable("prayer_config", {
  id: serial("id").primaryKey(),
  calculationMethod: text("calculation_method").notNull().default("MWL"),
  asrJuristic: text("asr_juristic").notNull().default("Standard"),
  adjustHighLats: text("adjust_high_lats").notNull().default("AngleBased"),
  timeFormat: text("time_format").notNull().default("24h"),
});

export const insertPrayerConfigSchema = createInsertSchema(prayerConfig).omit({
  id: true,
});

export type InsertPrayerConfig = z.infer<typeof insertPrayerConfigSchema>;
export type PrayerConfig = typeof prayerConfig.$inferSelect;

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  startDateTime: timestamp("start_date_time").notNull(),
  endDateTime: timestamp("end_date_time").notNull(),
  imageUrl: text("image_url"),
  recurring: boolean("recurring").default(false),
  recurringPattern: text("recurring_pattern"),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Gallery Images
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  uploadDate: timestamp("upload_date").notNull().defaultNow(),
  featured: boolean("featured").default(false),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  uploadDate: true,
});

export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;

// Services/Programs
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  dayOfWeek: text("day_of_week"),
  time: text("time"),
  featured: boolean("featured").default(false),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Contact Form Submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  responded: boolean("responded").default(false),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
  responded: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Donations
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  donorName: text("donor_name"),
  donorEmail: text("donor_email"),
  message: text("message"),
  donatedAt: timestamp("donated_at").notNull().defaultNow(),
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  donatedAt: true,
});

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;
