export const getFileType = (fileName) => {
  return (
    fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
    fileName
  );
};
