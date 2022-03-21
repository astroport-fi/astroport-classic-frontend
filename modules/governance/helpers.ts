import { ASTROPORT_URLS } from "constants/constants";
import {
  Proposal,
  Proposal_History,
  Proposal_Vote_Stats,
  Proposal_Status,
} from "types/common";

export const convertTimestampToDate = (
  dateString: string = new Date().toISOString(),
  utc: boolean = false
): string => {
  const date = new Date(dateString);
  const day = utc ? date.getUTCDate() : date.getDate();
  const month = utc ? date.getUTCMonth() : date.getMonth();
  const year = utc ? date.getUTCFullYear() : date.getFullYear();

  const abbrvMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day}/${abbrvMonths[month]}/${String(year).substring(2)}`;
};

export const convertTimestapToHHMMSS = (
  dateString: string = new Date().toISOString(),
  utc: boolean = false
): string => {
  const date = new Date(dateString);
  const hours = utc ? date.getUTCHours() : date.getHours();
  const minutes = utc ? date.getUTCMinutes() : date.getMinutes();
  const seconds = utc ? date.getUTCSeconds() : date.getSeconds();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export const getProposalEndDateString = (
  dateString: string
): [string, string] => {
  const daysBetween = (date1: Date, date2: Date): number => {
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceMs = date2.getTime() - date1.getTime();
    return Math.round(differenceMs / oneDay);
  };

  const date = new Date(dateString);
  const now = new Date();
  const daysDiff = daysBetween(now, date);

  if (daysDiff > 1) {
    return ["Ends:", `${daysDiff} days left`];
  } else if (daysDiff < 0) {
    return ["Vote ended:", convertTimestampToDate(date.toISOString())];
  }

  return ["Ends:", `${convertTimestapToHHMMSS(date.toISOString())}`];
};

export const createHistoryBlocks = (proposal: Proposal): Proposal_History => {
  const colorOn = "whiteAlpha.900";
  const colorOff = "whiteAlpha.400";
  const colorGreen = "green.500";
  const colorRed = "red.500";

  const state = proposal.state;

  const activeOn = !proposal.active ? colorOff : colorOn;
  const succeededOn = !(proposal.passed || proposal.rejected)
    ? colorOff
    : colorOn;
  const executedOn = !proposal.executed ? colorOff : colorOn;

  const created = {
    title: "Created",
    dotColor: colorOn,
    color: colorOn,
    timestamp: proposal.start_timestamp,
  };

  const active = {
    title: "Active",
    dotColor: state === Proposal_Status.Active ? colorGreen : activeOn,
    color: activeOn,
    timestamp: proposal.active,
  };

  const succeeded = {
    title: proposal.rejected ? "Failed" : "Succeeded",
    dotColor:
      state === Proposal_Status.Passed
        ? colorGreen
        : state === Proposal_Status.Rejected || proposal.rejected
        ? colorRed
        : succeededOn,
    color: succeededOn,
    timestamp: proposal.passed || proposal.rejected,
  };

  const queued = {
    title: "Queued",
    dotColor: executedOn,
    color: executedOn,
    timestamp: proposal.executed,
  };

  const executed = {
    title: "Executed",
    dotColor: state === Proposal_Status.Executed ? colorGreen : executedOn,
    color: executedOn,
    timestamp: proposal.executed,
  };

  return [created, active, succeeded, queued, executed];
};

export const calcVotingPercentages = (
  proposal: Proposal
): Proposal_Vote_Stats => {
  const voteForPerc =
    proposal.votes_for_power && proposal.total_voting_power
      ? (proposal.votes_for_power / proposal.total_voting_power) * 100
      : 0;
  const voteAgainstPerc =
    proposal.votes_against_power && proposal.total_voting_power
      ? (proposal.votes_against_power / proposal.total_voting_power) * 100
      : 0;

  return {
    voteForPerc,
    voteAgainstPerc,
  };
};

export const composeTwitterLink = (
  network: string,
  title: string,
  id: string
) => {
  return (
    `https://twitter.com/intent/tweet?text=New Astroport proposal 🚀%0A%0A` +
    `${title}%0A%0A&url=${ASTROPORT_URLS[network]}governance/proposal/${id}`
  );
};

export const appendHttp = (url: string) => {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "http://" + url;
  }

  return url;
};
