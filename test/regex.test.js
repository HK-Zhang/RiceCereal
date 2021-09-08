testCssFindRegEx = (str) => {
  //https://jex.im/regulex
  // const cssFindRegEx = /.+(?=\s\{)/gim;
  const cssFindRegEx = /[^\s&]+(?=\s\{)|[^,\s]+(?=,)|[^,\s&]+(?=\s\.)|@.+(?=\s\{)|(?<=&:).+(?=\s\{)|(?<=&\[).+(?=\s\{)|(?<=&)\..+(?=\s\{)/gim;
  const unusedClass = [];
  let match;
  while ((match = cssFindRegEx.exec(str))) {
    const matchValue = match[0].trim();
    unusedClass.push(matchValue);
  }
  return unusedClass;
};

testEscapedRegEx = (str) => {
  const cssEscapedRegEx = /\s*@.+(?=\s\{)|\s*:[^\s]+(?=\s\{)|\s*\[.+(?=\s\{)|\s*::.+(?=\s\{)|\s*:[^\s]+(?=\s\.)/mgi;
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
  const result = testCssFindRegEx("      .o-header-links .o-header-link:hover, .o-header-links .o-header-link:focus, .o-header-links .o-header-link:active {");
  expect(result).toContain(".o-header-links");
  expect(result).toContain(".o-header-link:hover");
  expect(result).toContain(".o-header-link:focus");
  expect(result).toContain(".o-header-link:active");
});

test("      @media all and (max-width: 991px) {", () => {
  expect(testCssFindRegEx("      @media all and (max-width: 991px) {")).toContain("@media all and (max-width: 991px)");
});


test("    &[disabled] {", () => {
  expect(testCssFindRegEx("    &[disabled] {")).toContain("[disabled]");
});

test("      &:hover .anticon {", () => {
  const result =testCssFindRegEx("      &:hover .anticon {");
  expect(result).toContain(":hover");
  expect(result).toContain(".anticon");
});

test("        &.annicon-twitter {", () => {
  expect(testCssFindRegEx("        &.annicon-twitter {")).toContain(".annicon-twitter");
});

test("  &::-webkit-scrollbar {", () => {
  expect(testCssFindRegEx("  &::-webkit-scrollbar {")).toContain("::-webkit-scrollbar");
});

test("html {", () => {
  expect(testCssFindRegEx("html {")).toContain("html");
});

test("    &[disabled] {", () => {
  expect(testEscapedRegEx("    &[disabled] {")).toContain("[disabled]");
});

test("      &:hover .anticon {", () => {
  expect(testEscapedRegEx("      &:hover .anticon {")).toContain(":hover");
});

test("  &::-webkit-scrollbar {", () => {
  expect(testEscapedRegEx("  &::-webkit-scrollbar {")).toContain("::-webkit-scrollbar");
});

test("      @media all and (max-width: 991px) {", () => {
  expect(testEscapedRegEx("      @media all and (max-width: 991px) {")).toContain("@media all and (max-width: 991px)");
});