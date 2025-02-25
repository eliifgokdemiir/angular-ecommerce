import { Address } from "cluster";

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: Address[];
  }