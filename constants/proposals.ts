import { Proposal_Status, Proposal_Status_Props } from "types/common";

/* proposal limits */
export const MIN_TITLE_LENGTH = 4;
export const MAX_TITLE_LENGTH = 64;

export const MIN_DESCRIPTION_LENGTH = 4;
export const MAX_DESCRIPTION_LENGTH = 1024;

/* state colors */
export const PROPOSAL_STATE_COLORS: { [key: string]: Proposal_Status_Props } = {
  [Proposal_Status.Active]: {
    title: "active",
    lightColor: "proposalColours.purpleLight",
    color: "proposalColours.purple",
  },
  [Proposal_Status.Passed]: {
    title: "successful",
    lightColor: "proposalColours.greenLight",
    color: "proposalColours.green",
  },
  [Proposal_Status.Rejected]: {
    title: "failed",
    lightColor: "proposalColours.redLight",
    color: "proposalColours.red",
  },
  [Proposal_Status.Expired]: {
    title: "expired",
    lightColor: "white.100",
    color: "whiteAlpha.400",
  },
  [Proposal_Status.Executed]: {
    title: "executed",
    lightColor: "white.100",
    color: "whiteAlpha.400",
  },
};
