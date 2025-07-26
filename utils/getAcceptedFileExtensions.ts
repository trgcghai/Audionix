const getAcceptedFileExtensions = (
  acceptObj: Record<string, string[]>
): string => {
  return Object.values(acceptObj)
    .flat()
    .map((ext) => ext.replace(".", "").toUpperCase())
    .join(", ");
};

export default getAcceptedFileExtensions;
