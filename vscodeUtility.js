const vscode = require("vscode");
const { htmlFileExtensions } = require("./variable.js");

exports.loadHtmlDocuments = function (files) {
  const htmlDocuments = [];
  return new Promise((resolve) => {
    Promise.all(
      files.map((file) => vscode.workspace.openTextDocument(file))
    ).then((promisesResults) => {
      const openedFiles = [].concat(...promisesResults);
      openedFiles.forEach((openedFile) => {
        htmlDocuments.push(openedFile.getText());
      });
      resolve(htmlDocuments);
    });
  });
};

exports.checkFiles = function (editor) {
  return new Promise((resolve, reject) => {
    try {
      const folder = editor.document.uri.path.substring(
        0,
        editor.document.uri.path.lastIndexOf("/")
      );
      if (folder && folder.length > 0) {
        Promise.all(
          htmlFileExtensions.map((type) =>
            vscode.workspace.findFiles(
              new vscode.RelativePattern(folder, `**/*.${type}`)
            )
          )
        ).then((searches) => {
          const uris = [].concat(...searches);
          resolve(uris);
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
