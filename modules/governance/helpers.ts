import {
  PROPOSAL_INVALID_CHARS,
  PROPOSAL_VALID_URLS,
} from "constants/proposals";
import {
  handleTinyAmount,
  handleAmountWithoutTrailingZeros,
} from "modules/common";
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

  return `${String(day).padStart(2, "0")}/${abbrvMonths[month]}/${String(
    year
  ).substring(2)}`;
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

  const blockBHighlight = !proposal.active ? colorOff : colorOn;
  const blockCHighlight = !(
    proposal.passed ||
    proposal.rejected ||
    state === Proposal_Status.Hidden
  )
    ? colorOff
    : colorOn;
  const blockDHighlight = !proposal.executed ? colorOff : colorOn;

  const blockA = {
    title: "Created",
    dotColor: colorOn,
    color: colorOn,
    timestamp: proposal.start_timestamp,
  };

  const blockB = {
    title: "Active",
    dotColor: state === Proposal_Status.Active ? colorGreen : blockBHighlight,
    color: blockBHighlight,
    timestamp: proposal.active,
  };

  const blockC = {
    title: proposal.rejected
      ? "Failed"
      : state === "Hidden"
      ? "Timed Out"
      : "Queued",
    dotColor:
      state === Proposal_Status.Passed
        ? colorGreen
        : state === Proposal_Status.Rejected || proposal.rejected
        ? colorRed
        : blockCHighlight,
    color: blockCHighlight,
    timestamp: proposal.passed || proposal.rejected,
  };

  const blockD = {
    title: "Executed",
    dotColor: state === Proposal_Status.Executed ? colorGreen : blockDHighlight,
    color: blockDHighlight,
    timestamp: proposal.executed,
  };

  return [blockA, blockB, blockC, blockD];
};

export const calcVotingPower = (proposal: Proposal): Proposal_Vote_Power => {
  const voteForPower =
    proposal.votes_for_power && proposal.total_voting_power
      ? (proposal.votes_for_power / proposal.total_voting_power) * 100
      : 0;
  const voteAgainstPower =
    proposal.votes_against_power && proposal.total_voting_power
      ? (proposal.votes_against_power / proposal.total_voting_power) * 100
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
    proposal.votes_for_power !== null && proposal.votes_against_power !== null
      ? (proposal.votes_for_power * 100) /
        (proposal.votes_for_power + proposal.votes_against_power)
      : 0;
  const voteAgainstDist =
    proposal.votes_for_power !== null && proposal.votes_against_power !== null
      ? (proposal.votes_against_power * 100) /
        (proposal.votes_for_power + proposal.votes_against_power)
      : 0;

  return {
    voteForDist,
    voteAgainstDist,
  };
};

export const composeTwitterLink = (title: string = "", id: string) => {
  return (
    `https://twitter.com/intent/tweet?text=New Astroport proposal 🚀%0A%0A` +
    // @ts-ignore
    `${title}%0A%0A&url=https://app.astroport.fi/governance/proposal/${id}`
  );
};

export const composeAstroRatioDisplay = (
  astroMintRatio: number | null | undefined,
  minDisplayValue: number = 0.01
): string => {
  if (!astroMintRatio) {
    return `-`;
  }

  const ratio = 1 / astroMintRatio;

  if (ratio < minDisplayValue) {
    return `< 1:0.01`;
  }

  return `1:${handleAmountWithoutTrailingZeros(ratio)}`;
};

export const composeProtocolRatioDisplay = (
  stakedAstroBalance?: string,
  xAstroSupply?: string,
  astroCircSupply?: number,
  stakingRatio?: number
): string => {
  if (
    stakedAstroBalance === undefined ||
    xAstroSupply === undefined ||
    astroCircSupply === undefined ||
    stakingRatio === undefined
  ) {
    return `-`;
  }

  if (stakedAstroBalance === "0") {
    return `0%`;
  }

  if (xAstroSupply === "0") {
    return stakingRatio ? `${handleTinyAmount(stakingRatio)}%` : `-`;
  }

  return stakedAstroBalance && astroCircSupply
    ? `${handleTinyAmount(
        Number(stakedAstroBalance) / (astroCircSupply * 10 ** 4)
      )}%`
    : `-`;
};

export const validateProposalUrl = (input: string): Boolean => {
  const validUrl = PROPOSAL_VALID_URLS.find((url) => {
    return input.startsWith(url);
  });

  if (validUrl) {
    return true;
  }

  return false;
};

export const validateInvalidChars = (input: string): Boolean => {
  const invalidChars = PROPOSAL_INVALID_CHARS.find((char) => {
    return input.includes(char);
  });

  if (invalidChars) {
    return false;
  }

  return true;
};
