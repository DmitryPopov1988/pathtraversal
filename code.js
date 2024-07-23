const isFileAvailable = async (
  dir: string,
  filename: string,
): Promise<boolean> => {
  try {
    await import(`${dir}/${filename}`);

    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };
