import { ProposalStatus, ProposalStatusProperty } from "types/common";

export const getProposalStatusProperties = (
  value: ProposalStatus
): ProposalStatusProperty => {
  switch (value) {
    case ProposalStatus.Fail:
      return {
        title: "failed",
        lightColor: "proposalColours.redLight",
        color: "proposalColours.red",
      };
    case ProposalStatus.Active:
      return {
        title: "active",
        lightColor: "proposalColours.greenLight",
        color: "proposalColours.green",
      };
    case ProposalStatus.Passed:
      return {
        title: "passed",
        lightColor: "proposalColours.greenLight",
        color: "proposalColours.green",
      };
    case ProposalStatus.Implemented:
      return {
        title: "implemented",
        lightColor: "proposalColours.purpleLight",
        color: "proposalColours.purple",
      };
  }
  return null;
};

export const convertTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${String(year).substring(2)}`;
};

export const convertTimestapToMMHHSS = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export const getProposalEndDateString = (timestamp: number): string => {
  const daysBetween = (date1: Date, date2: Date): number => {
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceMs = date2.getTime() - date1.getTime();
    return Math.round(differenceMs / oneDay);
  };

  const date = new Date(timestamp * 1000);
  const now = new Date();
  const daysDiff = daysBetween(date, now);

  if (daysDiff > 1) {
    return `${daysDiff} days left`;
  } else {
    return `${convertTimestapToMMHHSS(timestamp)}`;
  }
};
