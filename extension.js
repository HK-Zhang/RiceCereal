"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
  console.log("RiceCereal Unused CSS Plugin is activated");
  let timeout = undefined;
  const styleFileExtensions = ["css", "scss", "sass"];
  const htmlFileExtensions = ["htm", "html", "jsx", "js"];
  // const cssFindRegEx = /([^\s]+).+(?=\s\{)/mgi;
  const cssEscapedRegEx =
    /\s*@.+|\s*:\S+|\s*\[.+\]|\s*::.+(?=\s\{)|\s*:[^\s]+(?=\s\.)/gim;
  const cssFindRegEx =
    /[^\s&]+(?=\s\{)|\.[^,\s]+(?=,)|[^,\s&]+(?=\s\.)|@.+(?=\s\{)|(?<=&:).+(?=\s\{)|(?<=&\[).+(?=\s\{)|(?<=&)\..+(?=\s\{)|^[^\[]+(?=,$)|(?<=abbr\[).+(?=\],$)/gim;
  const fullHtmlTagsClassesRegEx =
    /(?<=id=")[^"]+|(?<=id=')[^']+|(?<=\[id\]=")[^"]+|(?<=\[id\]=')[^']+|(?<=<)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+|(?<=@include\s)[^\s]+|(?<=\{styles.)[\w_-]+/gim;
  const unusedClassDecorationType =
    vscode.window.createTextEditorDecorationType({
      color: { id: "riceCereal.unusedCssClassColor" },
    });
  let activeEditor = vscode.window.activeTextEditor;
  function loadHtmlDocuments(files) {
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
  }
  function isClassUsed(className, documents) {
    let found = false;
    documents.forEach((doc) => {
      let match;
      let cssKeys = [];
      doc = doc.toLowerCase();
      let classNames = className
        .replace(/[#.]/gim, "")
        .toLowerCase()
        .split(" ");
      while ((match = fullHtmlTagsClassesRegEx.exec(doc))) {
        cssKeys.push(...match[0].replace(/["']/gim, "").split(" "));
      }
      classNames = [
        ...classNames.map((x) =>
          x.substring(
            0,
            x.lastIndexOf(":") === -1 ? x.length : x.lastIndexOf(":")
          )
        ),
      ];
      const uniqueKeys = new Set(cssKeys);
      classNames.forEach((className) => {
        if (uniqueKeys.has(className)) {
          found = true;
          return;
        }
      });
    });
    return found;
  }
  function checkFiles(editor) {
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
  }
  function isFileType(path, types) {
    const extension = path.substring(path.lastIndexOf(".") + 1, path.length);
    return types.find((elem) => elem === extension) !== undefined;
  }
  function updateDecorations() {
    const editor = activeEditor ? activeEditor : undefined;
    if (!editor) {
      return;
    }
    if (!isFileType(editor.document.uri.path, styleFileExtensions)) {
      return;
    }
    const editorText = editor.document.getText();
    checkFiles(editor)
      .then((files) => {
        const text = editorText;
        loadHtmlDocuments(files).then((documents) => {
          if (documents.length > 0) {
            const unusedClass = [];
            let match;
            while ((match = cssFindRegEx.exec(text))) {
              const matchValue = match[0].trim();
              if (matchValue.match(cssEscapedRegEx) !== null) {
                continue;
              }
              const startPos = editor.document.positionAt(match.index);
              const endPos = editor.document.positionAt(
                match.index + matchValue.length
              );
              const decoration = {
                range: new vscode.Range(startPos, endPos),
                hoverMessage: "Class **" + matchValue + "**",
              };
              if (!isClassUsed(matchValue, documents)) {
                unusedClass.push(decoration);
                editor.setDecorations(unusedClassDecorationType, unusedClass);
              }
            }
          }
        });
      })
      .catch((error) => {
        vscode.window.showErrorMessage(`Error: ${error}`);
      });
  }
  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(updateDecorations, 1000);
  }
  if (activeEditor) {
    triggerUpdateDecorations();
  }
  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor;
      if (editor) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );
  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );
}
exports.activate = activate;
