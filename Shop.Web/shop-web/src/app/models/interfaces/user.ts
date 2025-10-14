export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UpdateUser {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ChangePassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}
