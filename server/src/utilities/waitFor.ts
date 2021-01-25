const waitFor = (ms: number): Promise<unknown> => new Promise((res) => setTimeout(res, ms));

export default waitFor;
