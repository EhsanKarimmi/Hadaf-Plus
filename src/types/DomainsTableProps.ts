import { Domain } from "./Domain";

export interface DomainsTableProps {
  edit: (domain: Domain) => void;
  sort: string;
  searchQuery: string;
}
