import { ASTROPORT_URLS } from "constants/constants";

export const convertTimestampToDate = (
  timestamp: number = new Date().getTime(),
  utc: boolean = false
): string => {
  const date = new Date(timestamp);
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
  timestamp: number = new Date().getTime(),
  utc: boolean = false
): string => {
  const date = new Date(timestamp);
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
    return ["Vote ended:", convertTimestampToDate(date.getTime())];
  }

  return ["Ends:", `${convertTimestapToHHMMSS(date.getTime())}`];
};

export const getGovProposalStepStatus = (
  index: number,
  completeStatus: number
) => {
  let steps = [
    "Created",
    "Active",
    completeStatus === -1 ? "Failed" : "Succeeded",
    "Queued",
    "Executed",
  ];

  return steps[index];
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
