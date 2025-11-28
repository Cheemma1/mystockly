export interface IUserSignUp {
  email: string;
  password: string;
  businessName: string;
}

export interface IProfile {
  id: string;
  user_id: string;
  display_name: string;
  phone: string;
  plan: string;
  created_at: string;
}
