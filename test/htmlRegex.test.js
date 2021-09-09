testHtmlRegEx = (str) => {
  const cssEscapedRegEx =
    /(?<=id=")[^"]+|(?<=id=')[^']+|(?<=\[id\]=")[^"]+|(?<=\[id\]=')[^']+|(?<=<)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+|(?<=@include\s)[^\s]+|(?<=\bstyles.)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=\{`)[^$]+(?=\`)/gim;
  const escapedClass = [];
  let match;
  while ((match = cssEscapedRegEx.exec(str))) {
    const matchValue = match[0].trim();
    escapedClass.push(matchValue);
  }
  return escapedClass;
};

test('                      className={this.props.selected ? styles.yellow : ""}', () => {
  expect(
    testHtmlRegEx(
      '                      className={this.props.selected ? styles.yellow : ""}'
    )
  ).toContain("yellow");
});

test("              <div className={`mainContainer  as`}>", () => {
  expect(
    testHtmlRegEx("              <div className={`mainContainer  as`}>")
  ).toContain("mainContainer  as");
});

test("                            className={`${styles.imageUp} opacity${this.state.opacity}`}", () => {
  expect(
    testHtmlRegEx(
      "                            className={`${styles.imageUp} opacity${this.state.opacity}`}"
    )
  ).toContain("imageUp");
});
