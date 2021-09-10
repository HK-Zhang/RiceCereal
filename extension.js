"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const { checkUnUsedCss } = require("./unusedCss.js");

function activate(context) {
  console.log("RiceCereal CSS Refactor Tool is activated");
  let timeout = undefined;
  let activeEditor = vscode.window.activeTextEditor;

  function updateDecorations() {
    const editor = activeEditor ? activeEditor : undefined;
    if (!editor) {
      return;
    }
    checkUnUsedCss(editor);
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
