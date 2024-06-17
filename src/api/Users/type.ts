import { User } from "@/models/user";
export type UserResponse = {
    data: User[]
};
export type UserFilter = {
  skip: number, 
  take: number,
  sortField: string
  sortOrder: string
  filter?: any
}