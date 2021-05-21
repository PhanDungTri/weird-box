export const waitFor = (ms: number): Promise<unknown> => new Promise((res) => setTimeout(res, ms));
