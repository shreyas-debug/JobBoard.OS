export type Department = "Engineering" | "Design" | "Marketing";
export type Location = "Remote" | "London" | "NYC";
export type JobType = "Full-time" | "Contract";

export interface Job {
  id: string;
  title: string;
  department: Department;
  location: Location;
  type: JobType;
  salaryRange: string;
  description: string;
  postedAt: string;
  companyName?: string;
  logoUrl?: string;
}
