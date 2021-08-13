export enum PollStatus {
  InProgress = "in_progress",
  Passed = "passed",
  Rejected = "rejected",
  Executed = "executed",
}

export enum VoteType {
  Yes = 0,
  No = 1,
}

export enum PollType {
  "Community-pool Spend" = 0,
}

export type Poll = {
  id: string;
  title: string;
  description: string;
  creator: string;
  end_time: number;
  submittedAt: string;
  endAt: string;
  recipient: string;
  status: PollStatus;
  type: PollType;
  progress: number;
  amount: string;
  total: string;
  yes_votes: string;
  no_votes: string;
  abstain_votes: string;
  total_balance_at_end_poll: string;
};
