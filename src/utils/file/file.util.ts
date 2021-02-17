export const fileSize = (size) => {
  if (size === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const fileType = (fileName) => {
  return (
    fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
    fileName
  );
};
