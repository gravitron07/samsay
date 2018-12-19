'use strict';
const chalk = require('chalk');
const pad = require('pad-component');
const wrap = require('wrap-ansi');
const stringWidth = require('string-width');
const stripAnsi = require('strip-ansi');
const ansiStyles = require('ansi-styles');
const ansiRegex = require('ansi-regex')();
const cliBoxes = require('cli-boxes');

const border = cliBoxes.round;
const leftOffset = 17;
const defaultGreeting =
'\n......................=???I7$ZOOO8888888D88888OOOZI+, ..........................' +
'\n.................  ~??++7ZOOO88888D88DDDDDDDDDDD8888O7=.........................' +
'\n.............. . +?+=7ZZOO88888888DDDDDDDDDDDDDDDDDDD8O$?. .....................' +
'\n...............=?+I7$$OO888888888D8DDDDDDDDDDDDDDDDDDDD887:.....................' +
'\n.............:++II$ZZZOO88888D88DDDDDDDDDDDDDDDDDDDDDDDDD8$?....................' +
'\n..........,=+II$ZOZZZZOOOO88888DDDDDDDDDDDDDDDDDDDDDDDDDDD88Z?..................' +
'\n.........,=+I7$ZZ$ZZZZZOOO888888DDDDDDDDDDDDDDDDDDDDDDDDDDDD8$+.................' +
'\n...... .,~+I7$$$$$$$ZZZZOOOO8888DD88DDDDDDDDDDDDDDDDDDDDDDD88OZ~. ..............' +
'\n...... ,~+?7$$$$$$$$$ZZZOOOOO8OO888DD8DDDDDDDDDDDDDDDDDDDDDD8OOZ................' +
'\n......,=++7I7777777$7$ZZZZOOZZOO888OD88D88DDDDDDDDDDDDDDDD8DD88Z+...............' +
'\n......==?I77I7777I7II77$ZZZZZOOOO888O8888DDDDDDDDDDDDDDDDD888888$ ..............' +
'\n.....~+??77IIII77II7777$$ZOZOOOOO88888888888DDDDDDDDDDDDD8888888Z+..............' +
'\n.....++IIII??I7II$I77777$ZOZOOOOOOOO88888D8DDDDDDDDDDDDDD8888888O7..............' +
'\n....:+III????+?III777$77$ZZOOOZO8OO88888DD88DDDDDDDDD8DDD888888O8$,.............' +
'\n....?+??????+???II77777$ZZZOOOOOOO8888O88888DDDDDDDDDD8D8D8888888O+.............' +
'\n.. .?????+?+?+??III$$$$Z$$OZOOOO888888D8DD8DDDDDDDDDDDDDDDDD88888O7 ............' +
'\n.. .????++++=+?+?I7I7$7$$ZZZOOOO888888888888DDDDDDDDDD88888888888O$.............' +
'\n....????+====++++?III7$ZOZOOOOO88O8O88D88888DD8DDDDDDDDD8DD888D8D8Z=............' +
'\n...:???+??+++=????III$$$ZZO8OO8OOO888888888DDDDDDDDDDDD888888888DD8I .. .. .....' +
'\n.. ,???+++++???III?II77$ZZOOOOOOOO8888888888888DDDDDDDDDD88D8D8DDDD7.MD8DDN,....' +
'\n....????++??I?III77II7I7ZZZOZZOOOOOOOOOOO888888DDDDDDD88DDDD8DDDDDNNDDD88DDN ...' +
'\n....?I??????+++?77I7I77$$$ZZ$ZOOOOOOOZZZO8DDDDDDD8D8DDD8DDD88DDDDND88D88O8DN? ..' +
'\n....+?I????IIII77I77$$77$Z$$$ZZOOOOO8888DDNDDDNNDD8888DD8DDD8DDDDD88888888DN8...' +
'\n.....????????????7777$$$$$$Z7$ZOOO88DDNNNNND888DDD8D8D8DDDDDD8DDD888D88D88DDD...' +
'\n.....????????+??I77$ZZZZ$$7?$ZOZOO88DDDDD88888DD888888D8DDDDD8D8DD8DNNDDDDDDD...' +
'\n.... ,+?????+++??7$$ZZOZZO7Z$OO8888DD888888DDNNNNDD8888888DDDDDD88DDNMNNNDDNI...' +
'\n....  ++??++==++?I7$$$$ZOOOZO8888DDD8O88N7DNNNNNNND8DD8D8DDDDDD888DD8NNNNDDD. ..' +
'\n......~+??==++++?7$Z$7$ZZO888DDDDND8ODD?N~+MNN8ZN8D888D88DDDDDDD888D888DDDDD. ..' +
'\n.......+I7777$O8DOOOO$$$OOZ8888DDDNNDNDM+=+7OO8OD8888D888DDDDDD88D8DD8DN8DDD....' +
'\n......I+7I7IZZOOOOOOO8OOZZI7Z8OO8DNDDDND8888O8DDDD8888888D8888888888D8DDDDD8....' +
'\n.......~7?++?7$O88D8DDDD$7?=IZOO888D8DDD8888DDDDDD88O88888D888888D88DDD8DD8?....' +
'\n....... ?IIZ$D$OMNNDDD88II?+?$ZO88O888888DDDDDDDD88OOO88D888888888888DDDDD8.....' +
'\n........?7DN?,~ODNNZ8DZ777?+I$O88D88OOOOOOO88888O8O8O8888D888888D8888DDDDDZ.....' +
'\n...... .+?$$7,~~+IZODD$II+?+I$O8888888OOOOOO88OO8OOO8888888D888888888NDDDD......' +
'\n........~?I??=:+?Z8887?+++??7$O888DD8DDD88O8ZOOZO88888888888888888888DOI........' +
'\n.........?????7$ZO87+?+++?I77ZOO8DDD88DDND888OOOO8888888D8D8888D8888O888. ......' +
'\n.........+????7$$?I??I?I++?I7ZO888DDD8DDDDND8888888DD8888DDD888D88888O8O. ......' +
'\n.........++??+=+???+?7I7??+?7$ZZO8888888DDDDDD888888D8888DDDD88DD8888O88........' +
'\n......... +?++?=??++I7$?7+++I$O8888888888888DDD8888D8D888DDDD888D8888888........' +
'\n..........??I+++?=++IO??++II77ZO88MNMNDODDD888DD88DDDDD8DDDD88888DD88888:.......' +
'\n.......... ??++++=+I$O+?ZMMO7ZOO8NNN888DD88888888DDDDDDDDDDDDD8888D888887.......' +
'\n............?I??=+?78$IODDZ7IZZOZ8OOO88O888888888DDDDDDDDDDDDDD88D888888O.......' +
'\n.......... .,??I=?7ZO7++++==+I?I7OOOO888888888888D8DDDDDDDDDDDD88D8DDD88O.......' +
'\n.............~?I??$ZO+++++???I?$ZZZOOO88888D8D88D8DDDDDDDDDDDDDD888DDDD8OI. ....' +
'\n............ .I?I?ZO7??++????IIZZZZ$O8888888D8DDDDDDDDDDDDDDDDDD88DDD8DD8O .....' +
'\n...............??77$??????????I$Z$ZZ8O88888DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD8O.....' +
'\n...............:?I7$?I?????+++I7ZO8DDDDDDDDDNNMMNNDDDDDDDDDDDDDDDDDDDDDDD8M8$.  ' +
'\n............... I?7$I?????++?$$OZDNNNNNNNNNDN8DDDDDDDDDDDDDDDDDDNNDDDDDDDDMDNM. ' +
'\n.............. ..II7IIIII?$O888D88DNDDDDDDD8DDDDDDDDDDDDDDDDDDDDNDNDDDDDDNNDNNM+' +
'\n.................?I7II7$$88O7I7IZ8Z8O88ODDDDDD8DDDDDDDDDDNDDDDDNNNDDDDDDNNNNNMNN' +
'\n................. I77I7O87I77I??7$OODDDDDDDDDDDDDDDDDDDDNDDDDNNNNDDDNDDDNNNNNMNN' +
'\n.................. 7II7ZZII7$$$$OO8D88DD8DDDDDDDDDDNDDDDNDDDNNNDNDDDDDNNNNNNNMNN' +
'\n....................$I7$$IIII7$ZOOOOO8O88DDDDDDDDDDDDDDNNDNNNNNNDDDDDNMNNNNNMMMN' +
'\n...................  $77$77II77$ZOZZOOOO88DDDDDDDDDDDDNDNNNNNNNNNNNNNMNNNNNNNMMN' +
'\n......................$$$7$7$$77$Z7Z$ZZ88888D8DDDDDDDNNNNNNNNNNNNNNMNNNNNNNMNMMN' +
'\n.......................=$Z$$77I77I7$ZZOO88DDDDDDDDDDNNNNNNNNNNNNNMMNNNNNNNNNMMMM' +
'\n....................... :$Z$777I?II$OOO88DDDDDDDDDDNNNNNNNMMMMMNMNNNNNNNNMNMMMMM' +
'\n........................  ZZ$77II7ZOO8O8DDDDNNNNNNNNNNMMMMMMMMMNNNNNNNNMMNNMMMMM' +
'\n................... ...:D8O8Z$$$$ZOO8DDDDDNNNNNNNNNNMMMMMMMMMMNMNNNNNNMNNMMMMMMM' +
'\n.....................$ND8DOZOD$$ZOD8DNNNNNNNNNNNMMMMMMMMMMMMNMMMMNMMMNMMMMMMMMMM';

module.exports = (message, options) => {
  message = (message || 'Welcome to Yeoman, mother fucker!').trim();
  options = options || {};

  /*
   * What you're about to see may confuse you. And rightfully so. Here's an
   * explanation.
   *
   * When yosay is given a string, we create a duplicate with the ansi styling
   * sucked out. This way, the true length of the string is read by `pad` and
   * `wrap`, so they can correctly do their job without getting tripped up by
   * the "invisible" ansi. Along with the duplicated, non-ansi string, we store
   * the character position of where the ansi was, so that when we go back over
   * each line that will be printed out in the message box, we check the
   * character position to see if it needs any styling, then re-insert it if
   * necessary.
   *
   * Better implementations welcome :)
   */

  let maxLength = 24;
  const styledIndexes = {};
  let completedString = '';
  let topOffset = 4;

  // Amount of characters of the yeoman character »column«      → `    /___A___\   /`
  const YEOMAN_CHARACTER_WIDTH = 17;

  // Amount of characters of the default top frame of the speech bubble → `╭──────────────────────────╮`
  const DEFAULT_TOP_FRAME_WIDTH = 28;

  // Amount of characters of a total line
  let TOTAL_CHARACTERS_PER_LINE = YEOMAN_CHARACTER_WIDTH + DEFAULT_TOP_FRAME_WIDTH;

  // The speech bubble will overflow the Yeoman character if the message is too long.
  const MAX_MESSAGE_LINES_BEFORE_OVERFLOW = 7;

  if (options.maxLength) {
    maxLength = stripAnsi(message).toLowerCase().split(' ').sort()[0].length;

    if (maxLength < options.maxLength) {
      maxLength = options.maxLength;
      TOTAL_CHARACTERS_PER_LINE = maxLength + YEOMAN_CHARACTER_WIDTH + topOffset;
    }
  }

  const regExNewLine = new RegExp(`\\s{${maxLength}}`);
  const borderHorizontal = border.horizontal.repeat(maxLength + 2);

  const frame = {
    top: border.topLeft + borderHorizontal + border.topRight,
    side: ansiStyles.reset.open + border.vertical + ansiStyles.reset.open,
    bottom: ansiStyles.reset.open + border.bottomLeft + borderHorizontal + border.bottomRight
  };

  message.replace(ansiRegex, (match, offset) => {
    Object.keys(styledIndexes).forEach(key => {
      offset -= styledIndexes[key].length;
    });

    styledIndexes[offset] = styledIndexes[offset] ? styledIndexes[offset] + match : match;
  });

  const strippedMessage = stripAnsi(message);
  const spacesIndex = [];

  strippedMessage.split(' ').reduce((accu, cur) => {
    spacesIndex.push(accu + cur.length);
    return spacesIndex[spacesIndex.length - 1] + 1;
  }, 0);

  return wrap(strippedMessage, maxLength, {hard: true})
    .split(/\n/)
    .reduce((greeting, str, index, array) => {
      if (!regExNewLine.test(str)) {
        str = str.trim();
      }

      completedString += str;

      let offset = 0;

      for (let i = 0; i < spacesIndex.length; i++) {
        let char = completedString[spacesIndex[i] - offset];
        if (char) {
          if (char !== ' ') {
            offset += 1;
          }
        } else {
          break;
        }
      }

      str = completedString
        .substr(completedString.length - str.length)
        .replace(/./g, (char, charIndex) => {
          charIndex += completedString.length - str.length + offset;

          let hasContinuedStyle = 0;
          let continuedStyle;

          Object.keys(styledIndexes).forEach(offset => {
            if (charIndex > offset) {
              hasContinuedStyle++;
              continuedStyle = styledIndexes[offset];
            }

            if (hasContinuedStyle === 1 && charIndex < offset) {
              hasContinuedStyle++;
            }
          });

          if (styledIndexes[charIndex]) {
            return styledIndexes[charIndex] + char;
          } else if (hasContinuedStyle >= 2) {
            return continuedStyle + char;
          }

          return char;
        })
        .trim();

      const paddedString = pad({
        length: stringWidth(str),
        valueOf() {
          return ansiStyles.reset.open + str + ansiStyles.reset.open;
        }
      }, maxLength);

      if (index === 0) {
        // Need to adjust the top position of the speech bubble depending on the
        // amount of lines of the message.
        if (array.length === 2) {
          topOffset -= 1;
        }

        if (array.length >= 3) {
          topOffset -= 2;
        }

        // The speech bubble will overflow the Yeoman character if the message
        // is too long. So we vertically center the bubble by adding empty lines
        // on top of the greeting.
        if (array.length > MAX_MESSAGE_LINES_BEFORE_OVERFLOW) {
          const emptyLines = Math.ceil((array.length - MAX_MESSAGE_LINES_BEFORE_OVERFLOW) / 2);

          for (let i = 0; i < emptyLines; i++) {
            greeting.unshift('');
          }

          frame.top = pad.left(frame.top, TOTAL_CHARACTERS_PER_LINE);
        }

        greeting[topOffset - 1] += frame.top;
      }

      greeting[index + topOffset] =
        (greeting[index + topOffset] || pad.left('', leftOffset)) +
        frame.side + ' ' + paddedString + ' ' + frame.side;

      if (array.length === index + 1) {
        greeting[index + topOffset + 1] =
          (greeting[index + topOffset + 1] || pad.left('', leftOffset)) +
          frame.bottom;
      }

      return greeting;
    }, defaultGreeting.split(/\n/))
    .join('\n') + '\n';
};
