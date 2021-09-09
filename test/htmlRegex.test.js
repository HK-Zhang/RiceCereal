testHtmlRegEx = (str) => {
  const cssEscapedRegEx =
    /(?<=[A-Za-z]+ClassName[\s\S]+")[^:]+(?="[\s\S]+\})|(?<=className:\s?["']{1})[\w_-]+(?=["']{1})|(?<=id=")[^"]+|(?<=id=')[^']+|(?<=\[id\]=")[^"]+|(?<=\[id\]=')[^']+|(?<=<)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+|(?<=@include\s)[^\s]+|(?<=\bstyles.)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=\{`)[^$]+(?=\`)/gim;
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

test('            className: "tableCell",', () => {
  expect(testHtmlRegEx('            className: "tableCell",')).toContain(
    "tableCell"
  );
});

test('                    <li className="mr-4">', () => {
  expect(testHtmlRegEx('                    <li className="mr-4">')).toContain(
    "mr-4"
  );
});

test('mutiple line code " pointer row-even" : " pointer row-odd"', () => {
  const result = testHtmlRegEx(`                rowClassName={(record, index) => {
    return (
      styles.rowContainer +
      (index % 2 === 0 ? " pointer row-even" : " pointer row-odd")
    );
  }}`);
  expect(result).toContain("pointer row-even");
  expect(result).toContain("pointer row-odd");
});
