testCssFindRegEx = (str) => {
  //https://jex.im/regulex
  //https://www.debuggex.com/
  // const cssFindRegEx = /.+(?=\s\{)/gim;
  //TODO abbr[title],abbr[data-original-title] | abbr[title],abbr[data-original-title] {
  const cssFindRegExTest =
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

  const cssFindRegEx = new RegExp(
    `${cssre1}|${cssre2}|${cssre3}|${cssre4}|${cssre5}|${cssre6}|${cssre7}|${cssre8}|${cssre9}|${cssre10}`,
    "gmi"
  );

  const unusedClass = [];
  let match;
  while ((match = cssFindRegEx.exec(str))) {
    const matchValue = match[0].trim();
    unusedClass.push(matchValue);
  }
  return unusedClass;
};

testEscapedRegEx = (str) => {
  const cssEscapedRegExTest =
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

    const cssEscapedRegEx = new RegExp(
      `${ecssre1}|${ecssre2}|${ecssre3}|${ecssre4}|${ecssre5}|${ecssre6}`,
      "gmi"
    );

  const escapedClass = [];
  let match;
  while ((match = cssEscapedRegEx.exec(str))) {
    const matchValue = match[0].trim();
    escapedClass.push(matchValue);
  }
  return escapedClass;
};

test("  .o-header {", () => {
  expect(testCssFindRegEx("  .o-header {")).toContain(".o-header");
});

test("    .o-header-links .o-header-link {", () => {
  const result = testCssFindRegEx("    .o-header-links .o-header-link {");
  expect(result).toContain(".o-header-links");
  expect(result).toContain(".o-header-link");
});

test("    .o-header-left, .o-header-right {", () => {
  const result = testCssFindRegEx("    .o-header-left, .o-header-right {");
  expect(result).toContain(".o-header-left");
  expect(result).toContain(".o-header-right");
});

test("      .o-header-links .o-header-link:hover, .o-header-links .o-header-link:focus, .o-header-links .o-header-link:active {", () => {
  const result = testCssFindRegEx(
    "      .o-header-links .o-header-link:hover, .o-header-links .o-header-link:focus, .o-header-links .o-header-link:active {"
  );
  expect(result).toContain(".o-header-links");
  expect(result).toContain(".o-header-link:hover");
  expect(result).toContain(".o-header-link:focus");
  expect(result).toContain(".o-header-link:active");
});

test("        &.annicon-twitter {", () => {
  expect(testCssFindRegEx("        &.annicon-twitter {")).toContain(
    ".annicon-twitter"
  );
});

test("html {", () => {
  expect(testCssFindRegEx("html {")).toContain("html");
});

test("    &[disabled] {", () => {
  expect(testCssFindRegEx("    &[disabled] {")).toContain("[disabled]");
});

test("[disabled]", () => {
  expect(testEscapedRegEx("[disabled]")).toContain("[disabled]");
});

// test("    &[disabled] {", () => {
//   expect(testEscapedRegEx("    &[disabled] {")).toContain("[disabled]");
// });

// test("      &:hover .anticon {", () => {
//   expect(testEscapedRegEx("      &:hover .anticon {")).toContain(":hover");
// });

test("      &:hover .anticon {", () => {
  const result = testCssFindRegEx("      &:hover .anticon {");
  expect(result).toContain(":hover");
  expect(result).toContain(".anticon");
});

test(":hover", () => {
  expect(testEscapedRegEx(":hover")).toContain(":hover");
});

test("  &::-webkit-scrollbar {", () => {
  expect(testCssFindRegEx("  &::-webkit-scrollbar {")).toContain(
    "::-webkit-scrollbar"
  );
});

test("::-webkit-scrollbar", () => {
  expect(testEscapedRegEx("::-webkit-scrollbar")).toContain(
    "::-webkit-scrollbar"
  );
});

// test("  &::-webkit-scrollbar {", () => {
//   expect(testEscapedRegEx("  &::-webkit-scrollbar {")).toContain("::-webkit-scrollbar");
// });

test("      @media all and (max-width: 991px) {", () => {
  expect(
    testCssFindRegEx("      @media all and (max-width: 991px) {")
  ).toContain("@media all and (max-width: 991px)");
});

test("@media all and (max-width: 991px)", () => {
  expect(testEscapedRegEx("@media all and (max-width: 991px)")).toContain(
    "@media all and (max-width: 991px)"
  );
});

// test("      @media all and (max-width: 991px) {", () => {
//   expect(testEscapedRegEx("      @media all and (max-width: 991px) {")).toContain("@media all and (max-width: 991px)");
// });

test("  font-family: sans-serif;", () => {
  expect(testCssFindRegEx("  font-family: sans-serif;")).toHaveLength(0);
});

test("  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);", () => {
  expect(
    testCssFindRegEx("  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);")
  ).toHaveLength(0);
});

test("  font-family: sans-serif;", () => {
  expect(testEscapedRegEx("  font-family: sans-serif;")).toHaveLength(0);
});

test("  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);", () => {
  expect(
    testEscapedRegEx("  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);")
  ).toHaveLength(0);
});

test('  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Microsoft YaHei", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";', () => {
  expect(
    testCssFindRegEx(
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Microsoft YaHei", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";'
    )
  ).toHaveLength(0);
});

test('  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Microsoft YaHei", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";', () => {
  expect(
    testEscapedRegEx(
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Microsoft YaHei", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";'
    )
  ).toHaveLength(0);
});

test("h1,", () => {
  expect(testCssFindRegEx("h1,")).toContain("h1");
});

test("h1", () => {
  expect(testEscapedRegEx("h1")).toHaveLength(0);
});

test("abbr[title],", () => {
  expect(testCssFindRegEx("abbr[title],")).toContain("title");
});

test("title", () => {
  expect(testEscapedRegEx("title")).toHaveLength(0);
});

test("        .ant-menu-root, .ant-menu-root {", () => {
  expect(
    testEscapedRegEx("        .ant-menu-root, .ant-menu-root {")
  ).toContain(".ant-menu-root");
});

test(".ol-container>li {", () => {
  expect(testCssFindRegEx(".ol-container>li {")).toContain(".ol-container");
});
