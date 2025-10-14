export interface DeliveryAddress {
  id?: number;
  userId: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  apartment?: string;
  postcode: string;
  phone: string;
  email: string;
  notes?: string;
  isDefault: boolean;
}