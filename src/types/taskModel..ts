export type taskModel = {
  id: number;
  userId: number;
  title: string;
  description: string;
  estimate: number; // In hours( 1=1H)
  status: string;  // Ready/waiting
  createdAt: Date;
};
