import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ── Types ───────────────────────────────────────────────────────────────
export interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  availability: boolean;
}

export interface AppointmentPayload {
  patient_name: string;
  phone: string;
  email?: string;
  service: string;
  appointment_date: string;
  slot_id: string;
  notes?: string;
}

export interface InquiryPayload {
  patient_name: string;
  contact: string;
  message: string;
}

// ── API calls ───────────────────────────────────────────────────────────
export const getAvailableSlots = () =>
  api.get<TimeSlot[]>("/api/timeslots");

export const createAppointment = (payload: AppointmentPayload) =>
  api.post("/api/appointments", payload);

export const createInquiry = (payload: InquiryPayload) =>
  api.post("/api/inquiries", payload);
