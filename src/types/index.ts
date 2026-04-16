// Database types matching Supabase schema

export interface School {
  id: string;
  name: string;
  band: "Band 1" | "Band 2" | "Band 3" | null;
  type: string;
  district: string;
  level: "小學" | "中學";
  features: string[];
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  level: string;
  description: string | null;
  urgent: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudyTip {
  id: string;
  title: string;
  description: string | null;
  level: "ALL" | "P" | "S" | null;
  icon: string;
  color: string;
  items: string[];
  created_at: string;
  updated_at: string;
}

export interface Admission {
  id: string;
  title: string;
  description: string | null;
  level: string | null;
  icon: string;
  color: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

// Form input types (for create/edit)
export type SchoolInput = Omit<School, "id" | "created_at" | "updated_at">;
export type EventInput = Omit<CalendarEvent, "id" | "created_at" | "updated_at">;
export type TipInput = Omit<StudyTip, "id" | "created_at" | "updated_at">;
export type AdmissionInput = Omit<Admission, "id" | "created_at" | "updated_at">;

// Dashboard stats
export interface DashboardStats {
  totalSchools: number;
  totalEvents: number;
  totalTips: number;
  totalGuides: number;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
