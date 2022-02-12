export const truncate = (text: string = "", [h, t]: number[] = [6, 6]) => {
  const head = text.slice(0, h);
  const tail = text.slice(-1 * t, text.length);
  return text.length > h + t ? [head, tail].join("...") : text;
};

export const displayTNS = (tnsName: string) => {
  if (tnsName.length < 8) {
    return tnsName;
  }

  return tnsName.slice(0, 3) + "...ust";
};
