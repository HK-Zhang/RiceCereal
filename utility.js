exports.isFileType = function(path, types) {
  const extension = path.substring(path.lastIndexOf(".") + 1, path.length);
  return types.find((elem) => elem === extension) !== undefined;
}
