export interface User {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phone: string;
  contact: string;
  proName: string;
  additionalMembers: string[];
  recommend: string;
  tour: string;
}
