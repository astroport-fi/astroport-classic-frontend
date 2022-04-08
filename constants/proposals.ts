import { Proposal_Status, Proposal_Status_Props } from "types/common";

/* proposal limits */
export const MIN_TITLE_LENGTH = 4;
export const MAX_TITLE_LENGTH = 64;

export const MIN_DESCRIPTION_LENGTH = 4;
export const MAX_DESCRIPTION_LENGTH = 1024;

export const MIN_LINK_LENGTH = 12;
export const MAX_LINK_LENGTH = 128;

export const PROPOSAL_INVALID_CHARS = [
  "$",
  ":",
  "^",
  "@",
  "|",
  "=",
  "~",
  "`",
  "\\",
  ";",
];

/* proposal links */
export const PROPOSAL_VALID_URLS = [
  "https://forum.astroport.fi/",
  "http://forum.astroport.fi/",
  "https://astroport.fi/",
  "http://astroport.fi/",
];

export const PROPOSAL_VALID_URLS_HELPER_LINK =
  "https://www.notion.so/astroport/Assembly-Parameters-fff1333061a348b4907da71cb1ee0f26";

/* state colors */
export const PROPOSAL_STATE_COLORS: { [key: string]: Proposal_Status_Props } = {
  [Proposal_Status.Active]: {
    title: "active",
    lightColor: "proposalColours.blueLight",
    color: "proposalColours.blue",
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
  [Proposal_Status.Hidden]: {
    title: "hidden",
    lightColor: "white.100",
    color: "whiteAlpha.400",
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
