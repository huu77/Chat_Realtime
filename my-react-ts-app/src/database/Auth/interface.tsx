export interface Login {
  email: string;
  password: string;
}
export interface Register extends Login{
  firstName:string; 
  lastName:string;
}