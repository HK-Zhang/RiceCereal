exports.cssFindRegExSingle =
  /[^\s&>]+(?=\s\{)|\.[^,\s]+(?=>)|\.[^,\s]+(?=,)|[^,\s&>]+(?=\s\.)|@.+(?=\s\{)|(?<=&:).+(?=\s\{)|(?<=&\[).+(?=\s\{)|(?<=&)\..+(?=\s\{)|^[^\[\s]+(?=,$)|(?<=abbr\[).+(?=\],$)/gim;

const cssregEx1 = /[^\s&>]+(?=\s\{)/;
const cssregEx2 = /\.[^,\s]+(?=>)/;
const cssregEx3 = /\.[^,\s]+(?=,)/;
const cssregEx4 = /[^,\s&>]+(?=\s\.)/;
const cssregEx5 = /@.+(?=\s\{)/;
const cssregEx6 = /(?<=&:).+(?=\s\{)/;
const cssregEx7 = /(?<=&\[).+(?=\s\{)/;
const cssregEx8 = /(?<=&)\..+(?=\s\{)/;
const cssregEx9 = /^[^\[\s]+(?=,$)/;
const cssregEx10 = /(?<=abbr\[).+(?=\],$)/;

const cssre1 = cssregEx1.toString().replace(/\//g, "");
const cssre2 = cssregEx2.toString().replace(/\//g, "");
const cssre3 = cssregEx3.toString().replace(/\//g, "");
const cssre4 = cssregEx4.toString().replace(/\//g, "");
const cssre5 = cssregEx5.toString().replace(/\//g, "");
const cssre6 = cssregEx6.toString().replace(/\//g, "");
const cssre7 = cssregEx7.toString().replace(/\//g, "");
const cssre8 = cssregEx8.toString().replace(/\//g, "");
const cssre9 = cssregEx9.toString().replace(/\//g, "");
const cssre10 = cssregEx10.toString().replace(/\//g, "");

// const cssFindRegEx = /([^\s]+).+(?=\s\{)/mgi;
exports.cssFindRegEx = new RegExp(
  `${cssre1}|${cssre2}|${cssre3}|${cssre4}|${cssre5}|${cssre6}|${cssre7}|${cssre8}|${cssre9}|${cssre10}`,
  "gmi"
);

exports.cssEscapedRegExSingle =
  /\s*@.+|\s*:\S+|\s*\[.+\]|\s*::.+(?=\s\{)|\s*:[^\s]+(?=\s\.)|\s*[.ant-]{5}[\w_-]+\b/gim;

const escapeCssRegEx1 = /\s*@.+/;
const escapeCssRegEx2 = /\s*:\S+/;
const escapeCssRegEx3 = /\s*\[.+\]/;
const escapeCssRegEx4 = /\s*::.+(?=\s\{)/;
const escapeCssRegEx5 = /\s*:[^\s]+(?=\s\.)/;
const escapeCssRegEx6 = /\s*[.ant-]{5}[\w_-]+\b/;

const ecssre1 = escapeCssRegEx1.toString().replace(/\//g, "");
const ecssre2 = escapeCssRegEx2.toString().replace(/\//g, "");
const ecssre3 = escapeCssRegEx3.toString().replace(/\//g, "");
const ecssre4 = escapeCssRegEx4.toString().replace(/\//g, "");
const ecssre5 = escapeCssRegEx5.toString().replace(/\//g, "");
const ecssre6 = escapeCssRegEx6.toString().replace(/\//g, "");

exports.cssEscapedRegEx = new RegExp(
  `${ecssre1}|${ecssre2}|${ecssre3}|${ecssre4}|${ecssre5}|${ecssre6}`,
  "gmi"
);

const regEx1 =
  /(?<=className=\{[^\}]+["`']{1})[^:"`'\{\}]+(?=["'`]{1}[^\{]+\})/;
const regEx2 = /(?<=className:\s?["']{1})[\w_-]+(?=["']{1})/;
const regEx3 = /(?<=id=")[^"]+/;
const regEx4 = /(?<=id=')[^']+/;
const regEx5 = /(?<=\[id\]=")[^"]+/;
const regEx6 = /(?<=\[id\]=')[^']+/;
const regEx7 = /(?<=<)[\w_-]+/;
const regEx8 = /(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+/;
const regEx9 = /(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+/;
const regEx10 = /(?<=@include\s)[^\s]+/;
const regEx11 = /(?<=\bstyles.)[\w_-]+/;
const regEx12 = /(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=\{`)[^$]+(?=\`)/;

const hre1 = regEx1.toString().replace(/\//g, "");
const hre2 = regEx2.toString().replace(/\//g, "");
const hre3 = regEx3.toString().replace(/\//g, "");
const hre4 = regEx4.toString().replace(/\//g, "");
const hre5 = regEx5.toString().replace(/\//g, "");
const hre6 = regEx6.toString().replace(/\//g, "");
const hre7 = regEx7.toString().replace(/\//g, "");
const hre8 = regEx8.toString().replace(/\//g, "");
const hre9 = regEx9.toString().replace(/\//g, "");
const hre10 = regEx10.toString().replace(/\//g, "");
const hre11 = regEx11.toString().replace(/\//g, "");
const hre12 = regEx12.toString().replace(/\//g, "");

exports.htmlCssRegExSingle =
  /(?<=className=\{[^\}]+["`']{1})[^:"`'\{\}]+(?=["'`]{1}[^\{]+\})|(?<=className:\s?["']{1})[\w_-]+(?=["']{1})|(?<=id=")[^"]+|(?<=id=')[^']+|(?<=\[id\]=")[^"]+|(?<=\[id\]=')[^']+|(?<=<)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+|(?<=@include\s)[^\s]+|(?<=\bstyles.)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=\{`)[^$]+(?=\`)/gim;

exports.fullHtmlTagsClassesRegEx = new RegExp(
  `${hre1}|${hre2}|${hre3}|${hre4}|${hre5}|${hre6}|${hre7}|${hre8}|${hre9}|${hre10}|${hre11}|${hre12}`,
  "gmi"
);

exports.styleFileExtensions = ["css", "scss", "sass", "less"];
exports.htmlFileExtensions = ["htm", "html", "jsx", "js", "tsx", "ts"];

