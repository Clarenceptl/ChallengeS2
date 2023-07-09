export const createRandToken = (): string => {
  let randomString = '';
  for (let i = 0; i < 4; i++) {
    const randNb = Math.random().toString(36);
    randomString += randNb.substring(2, randNb.length);
  }

  return randomString;
};
