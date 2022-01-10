export const tryCatch = async <P>(
  promise: Promise<P>
): Promise<[P, null] | [null, unknown]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};
