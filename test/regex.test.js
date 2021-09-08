testCssFindRegEx = (str) => {
  const cssFindRegEx = /.+(?=\s\{)/gim;
  const unusedClass = [];
  let match;
  while ((match = cssFindRegEx.exec(str))) {
    const matchValue = match[0].trim();
    unusedClass.push(matchValue);
  }
  return unusedClass;
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

test("      @media all and (max-width: 991px) {", () => {
  expect(testCssFindRegEx("      @media all and (max-width: 991px) {")).toContain("@media all and (max-width: 991px)");
});