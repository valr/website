var diffProcess = new diff_match_patch();
diffProcess.Diff_Timeout = 0; // no timeout

var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var text3 = document.getElementById("text3");

var mode = "line";
switchMode();

function diffChar() {
  var diffResult = diffProcess.diff_main(text1.value, text2.value);
  diffProcess.diff_cleanupSemantic(diffResult);
  text3.innerHTML = diffHTML(
    diffResult,
    "&para;<br />",
    "&para;<br />",
    "<br />",
  );
}

function diffLine() {
  // line mode requires complete lines
  diffText1 = text1.value + (text1.value.endsWith("\n") ? "" : "\n");
  diffText2 = text2.value + (text2.value.endsWith("\n") ? "" : "\n");

  var diffLn2Chr = diffProcess.diff_linesToChars_(diffText1, diffText2);
  var diffResult = diffProcess.diff_main(
    diffLn2Chr.chars1,
    diffLn2Chr.chars2,
    false,
  );
  diffProcess.diff_charsToLines_(diffResult, diffLn2Chr.lineArray);
  // diffProcess.diff_cleanupSemantic(diffResult); // this seems to break the line diff result
  text3.innerHTML = diffHTML(diffResult, "<br />", "<br />", "<br />");
}

function diffHTML(diffText, insEOL, delEOL, equEOL) {
  var html = [];

  for (var x = 0; x < diffText.length; x++) {
    var oper = diffText[x][0]; // operation: insert, delete or equal
    var data = diffText[x][1]; // text of operation
    var text = data
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    switch (oper) {
      case DIFF_INSERT:
        html[x] =
          "<ins class='" + mode + "'>" + text.replace(/\n/g, insEOL) + "</ins>";
        break;
      case DIFF_DELETE:
        html[x] =
          "<del class='" + mode + "'>" + text.replace(/\n/g, delEOL) + "</del>";
        break;
      case DIFF_EQUAL:
        html[x] = "<span>" + text.replace(/\n/g, equEOL) + "</span>";
        break;
    }
  }

  return html.join("");
}

function swapText() {
  var tmp = text1.value;
  text1.value = text2.value;
  text2.value = tmp;
  text2.onchange(); // trigger the refresh
}

function switchMode() {
  mode = mode === "line" ? "char" : "line";
  text1.onkeyup =
    text2.onkeyup =
    text1.onpaste =
    text2.onpaste =
    text1.onchange =
    text2.onchange =
      mode === "line" ? diffLine : diffChar;
  text2.onchange(); // trigger the refresh
}
