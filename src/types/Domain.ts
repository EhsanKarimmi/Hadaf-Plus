export interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
  status: "pending" | "verified" | "rejected";
  createdDate: number;
}
