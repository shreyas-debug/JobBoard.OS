export type Department = "Engineering" | "Design" | "Marketing" | "Product";
export type Location = "Remote" | "London" | "NYC" | "Berlin" | "San Francisco";
export type JobType = "Full-time" | "Contract" | "Part-time";

export interface Job {
  id: string;
  title: string;
  department: Department;
  location: Location;
  type: JobType;
  salaryRange: string;
  description: string;
  postedAt: string;
  companyName: string;
  logoUrl: string;
}
