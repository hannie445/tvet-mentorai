import type { LucideIcon } from "lucide-react";

export interface CourseInfo {
  code: string;
  name: string;
  sessionLabel: string;
}

export interface WorkflowItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  documentName: string;
}

export interface CoachAction {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface LessonHealth {
  rating: number;
  maxRating: number;
  status: string;
  percentage: number;
}

export interface CoachUser {
  name: string;
  initials: string;
}

export interface ProgressMetric {
  id: string;
  label: string;
  percentage: number;
}
