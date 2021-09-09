testHtmlRegEx = (str) => {
    const cssEscapedRegEx = /(?<=id=")[^"]+|(?<=id=')[^']+|(?<=\[id\]=")[^"]+|(?<=\[id\]=')[^']+|(?<=<)[\w_-]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=")[^"]+|(?<=[\[?ng]{0,2}class[Name]{0,4}\]?=')[^']+|(?<=@include\s)[^\s]+|(?<=\bstyles.)[\w_-]+/mgi;
    const escapedClass = [];
    let match;
    while ((match = cssEscapedRegEx.exec(str))) {
      const matchValue = match[0].trim();
      escapedClass.push(matchValue);
    }
    return escapedClass;
  };

  
  test('                      className={this.props.selected ? styles.yellow : ""}', () => {
    expect(testHtmlRegEx('                      className={this.props.selected ? styles.yellow : ""}')).toContain("yellow");
  });