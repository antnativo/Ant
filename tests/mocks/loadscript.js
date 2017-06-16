mock.isExternalScriptLoaded = function () {
  delete this.isExternalScriptLoaded;
  return true;
};