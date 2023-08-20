const extractingFileName = (inputString) => {
  const parts = inputString.split("/");
  const publicId = parts[1];
  return publicId;
};

module.exports = {
  extractingFileName,
};
