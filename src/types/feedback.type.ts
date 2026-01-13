export type FeedBacks = {
  _id: string;
  name: string;
  message: string;
  phone: string;
  email: string;
  subject: string;
  status: "pending" | "approved" | "rejected";
};
