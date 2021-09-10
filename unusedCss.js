const vscode = require("vscode");
const {
  fullHtmlTagsClassesRegEx,
  cssEscapedRegEx,
  cssFindRegEx,
  styleFileExtensions,
} = require("./variable.js");
const { checkFiles } = require("./vscodeUtility.js");
const { loadHtmlDocuments } = require("./vscodeUtility.js");
const { isFileType } = require("./utility.js");

const unusedClassDecorationType = vscode.window.createTextEditorDecorationType({
  color: { id: "riceCereal.unusedCssClassColor" },
});

const isClassUsed = function (className, documents) {
  let found = false;
  documents.forEach((doc) => {
    let match;
    let cssKeys = [];
    doc = doc.toLowerCase();
    let classNames = className.replace(/[#.]/gim, "").toLowerCase().split(" ");
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
};

exports.checkUnUsedCss = function (editor) {
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
              hoverMessage: "Unused Class **" + matchValue + "**",
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
};

// exports.unusedClassDecorationType = unusedClassDecorationType;
