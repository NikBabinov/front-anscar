export interface UserStatistica {
  id?: number;
  email: string;
  name: string;
  level?: number;
  countSolutionTask?: number;
  solutionTaskFirstTime?: number;
  userCreateDate?:Date;
  userUpdateDate?:Date;
  role?: string;
}
