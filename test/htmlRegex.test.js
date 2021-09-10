testHtmlRegEx = (str) => {
  // const cssEscapedRegEx =
  //   /(?<=[A-Za-z]+ClassName[\s\S]+["'`]{1})[^:]+(?=["'`]{1}[\s\S]+\})|(?<=className:\s?["']{1})[\w_-]+(?=["']{1})|(?<=id=")[^"]+|(?<=id=')[^']+|(?<=\[id\]=")[^"]+|(?<=\[id\]=')[^']+|(?<=<)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+|(?<=@include\s)[^\s]+|(?<=\bstyles.)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=\{`)[^$]+(?=\`)/gim;

  const regEx1 = /(?<=className=\{[^\}]+["`']{1})[^:"`'\{\}]+(?=["'`]{1}[^\{]+\})/;
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

  const htmlCssRegExTest =
    /(?<=className=\{[^\}]+["`']{1})[^:"`'\{\}]+(?=["'`]{1}[^\{]+\})|(?<=className:\s?["']{1})[\w_-]+(?=["']{1})|(?<=id=")[^"]+|(?<=id=')[^']+|(?<=\[id\]=")[^"]+|(?<=\[id\]=')[^']+|(?<=<)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+|(?<=@include\s)[^\s]+|(?<=\bstyles.)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=\{`)[^$]+(?=\`)/gim;

  const htmlCssRegEx = new RegExp(
    `${hre1}|${hre2}|${hre3}|${hre4}|${hre5}|${hre6}|${hre7}|${hre8}|${hre9}|${hre10}|${hre11}|${hre12}`,
    "gmi"
  );

  const escapedClass = [];
  let match;
  while ((match = htmlCssRegEx.exec(str))) {
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
  const result =
    testHtmlRegEx(`                rowClassName={(record, index) => {
    return (
      styles.rowContainer +
      (index % 2 === 0 ? " pointer row-even" : " pointer row-odd")
    );
  }}`);
  expect(result).toContain("pointer row-even");
  expect(result).toContain("pointer row-odd");
});

test("mutiple line code className={", () => {
  const result = testHtmlRegEx(`            <div
    className={
      this.state.hasScrollDown === true
        ? 'filterContainer imageSearchFilters fixed'
        : "filterContainer imageSearchFilters"
    }
  >`);
  expect(result).toContain("filterContainer imageSearchFilters fixed");
  expect(result).toContain("filterContainer imageSearchFilters");
});
