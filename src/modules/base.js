export default class Base {
  static adminCheck(message) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.channel
        .send(
          `Sorry ${message.author.username}, but you don't have permission to do that!`
        )
        .then(message => {
          message.delete(5000);
        });
      return false;
    } else {
      return true;
    }
  }

  static makeTable(rows, header) {
    if (!rows || rows.length === 0) return 'no data provided :/';

    header = header ? ` ${header} ` : '';

    const columnLengths = rows[0].map((column, index) => {
      return Math.max(...rows.map(row => row[index].length));
    });

    if (columnLengths.length < 2)
      columnLengths[0] = Math.max(columnLengths[0], header.length - 2);

    const table = rows.map(row => {
      const stringyRow = row
        .map((column, index) => {
          return column.padEnd(columnLengths[index]);
        })
        .join(' | ');
      return `\`| ${stringyRow} |\``;
    });

    const rowLength = Math.max(0, table[0].length - 4);

    table.unshift(
      `\`+${header}${'-'.repeat(Math.max(0, rowLength - header.length))}+\``
    );
    table.push(`\`+${'-'.repeat(rowLength)}+\``);

    return table.join('\n');
  }
}
