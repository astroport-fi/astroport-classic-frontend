import { num } from "@arthuryeti/terra";
import { ASTROPORT_URLS } from "constants/constants";
import {
  Proposal,
  Proposal_History,
  Proposal_Vote_Power,
  Proposal_Vote_Dist,
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
  const timeDiff = date.getTime() - now.getTime();

  if (daysDiff > 1) {
    return ["Ends:", `${daysDiff} days left`];
  } else if (now > date) {
    return ["Vote ended:", convertTimestampToDate(date.toISOString())];
  }

  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
  const minsLeft = Math.floor((timeDiff / (1000 * 60)) % 60);

  return ["Ends:", `${hoursLeft} hours ${minsLeft} mins`];
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
    title: proposal.rejected
      ? "Failed"
      : proposal.state === "Hidden"
      ? "Timed Out"
      : "Succeeded",
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

export const calcVotingPower = (proposal: Proposal): Proposal_Vote_Power => {
  const voteForPower =
    proposal.votes_for_power && proposal.total_voting_power
      ? (num(proposal.votes_for_power)
          .div(10 ** 6)
          .toNumber() /
          proposal.total_voting_power) *
        100
      : 0;
  const voteAgainstPower =
    proposal.votes_against_power && proposal.total_voting_power
      ? (num(proposal.votes_against_power)
          .div(10 ** 6)
          .toNumber() /
          proposal.total_voting_power) *
        100
      : 0;

  return {
    voteForPower,
    voteAgainstPower,
  };
};

export const calcVotingDistribution = (
  proposal: Proposal
): Proposal_Vote_Dist => {
  const voteForDist =
    (proposal.votes_for * 100) /
      (proposal.votes_for + proposal.votes_against) || 0;
  const voteAgainstDist =
    (proposal.votes_against * 100) /
      (proposal.votes_for + proposal.votes_against) || 0;

  return {
    voteForDist,
    voteAgainstDist,
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

export const appendHttps = (url: string) => {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  return url;
};
