export const getFeedItemTime = (date: string) => {
  const now = new Date();
  const feedItemDate = new Date(date);
  const inMs = now.getTime() - feedItemDate.getTime();

  const inMin = Math.floor(inMs / (1000 * 60));
  const inH = Math.floor(inMin / 60);
  const inD = Math.floor(inH / 24);
  const inY = Math.floor(inD / 365);
  if (inY > 0) {
    return `${inY}y`;
  } else if (inD > 0) {
    return `${inD}d`;
  } else if (inH > 0) {
    return `${inH}h`;
  } else if (inMin > 0) {
    return `${inMin}min`;
  } else {
    return `just now`;
  }
};
