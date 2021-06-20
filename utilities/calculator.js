const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const prefix = process.env.PREFIX;

module.exports = async (message) => {
 if (!message) throw new Error("You need to provide message to run calculator!");

 function i(length) {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
   result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
 }

 let str = " ";
 let stringify = "```\n" + str + "\n```";
 let calculator_clear = i(20);
 let calculator_e1 = i(20);
 let calculator_e2 = i(20);
 let calculator_uppercase = i(20);
 let calculator_7 = i(20);
 let calculator_8 = i(20);
 let calculator_9 = i(20);
 let calculator_plus = i(20);
 let calculator_minus = i(20);
 let calculator_star = i(20);
 let calculator_devide = i(20);
 let calculator_1 = i(20);
 let calculator_2 = i(20);
 let calculator_3 = i(20);
 let calculator_4 = i(20);
 let calculator_5 = i(20);
 let calculator_0 = i(20);
 let calculator_6 = i(20);
 let calculator_dot = i(20);
 let calculator_equal = i(20);
 let calculator_backspace = i(20);
 let calc_irrc = i(20);
 let empty_irrc = i(20);
 let calc_percent = i(20);

 let ac = new MessageButton().setLabel("AC").setID(calculator_clear).setStyle("red");
 let e1 = new MessageButton().setLabel("(").setID(calculator_e1).setStyle("blurple");
 let e2 = new MessageButton().setLabel(")").setID(calculator_e2).setStyle("blurple");
 let uppercase = new MessageButton().setLabel("^").setID(calculator_uppercase).setStyle("blurple");
 let seven = new MessageButton().setLabel("7️").setID(calculator_7).setStyle("gray");
 let eight = new MessageButton().setLabel("8️").setID(calculator_8).setStyle("gray");
 let nine = new MessageButton().setLabel("9️").setID(calculator_9).setStyle("gray");
 let slash = new MessageButton().setLabel("÷").setID(calculator_devide).setStyle("blurple");
 let four = new MessageButton().setLabel("4️").setID(calculator_4).setStyle("gray");
 let five = new MessageButton().setLabel("5️").setID(calculator_5).setStyle("gray");
 let six = new MessageButton().setLabel("6️").setID(calculator_6).setStyle("gray");
 let star = new MessageButton().setLabel("x").setID(calculator_star).setStyle("blurple");
 let one = new MessageButton().setLabel("1️").setID(calculator_1).setStyle("gray");
 let two = new MessageButton().setLabel("2️").setID(calculator_2).setStyle("gray");
 let three = new MessageButton().setLabel("3️").setID(calculator_3).setStyle("gray");
 let minus = new MessageButton().setLabel("-").setID(calculator_minus).setStyle("blurple");
 let zero = new MessageButton().setLabel("0️").setID(calculator_0).setStyle("gray");
 let dot = new MessageButton().setLabel(".").setID(calculator_dot).setStyle("blurple");
 let equal = new MessageButton().setLabel("=").setID(calculator_equal).setStyle("green");
 let plus = new MessageButton().setLabel("+").setID(calculator_plus).setStyle("blurple");
 let backspace = new MessageButton().setLabel("⌫").setID(calculator_backspace).setStyle("red");
 let destroy = new MessageButton().setLabel("DC").setID(calc_irrc).setStyle("red");
 let empty = new MessageButton().setLabel("\u200b").setID(empty_irrc).setStyle("gray").setDisabled();
 let percent = new MessageButton().setLabel("%").setID(calc_percent).setStyle("blurple");
 // Lock
 let qac = new MessageButton().setLabel("AC").setID(calculator_clear).setStyle("red").setDisabled();
 let qe1 = new MessageButton().setLabel("(").setID(calculator_e1).setStyle("blurple").setDisabled();
 let qe2 = new MessageButton().setLabel(")").setID(calculator_e2).setStyle("blurple").setDisabled();
 let quppercase = new MessageButton().setLabel("^").setID(calculator_uppercase).setStyle("blurple").setDisabled();
 let qseven = new MessageButton().setLabel("7️").setID(calculator_7).setStyle("gray").setDisabled();
 let qeight = new MessageButton().setLabel("8️").setID(calculator_8).setStyle("gray").setDisabled();
 let qnine = new MessageButton().setLabel("9️").setID(calculator_9).setStyle("gray").setDisabled();
 let qslash = new MessageButton().setLabel("÷").setID(calculator_devide).setStyle("blurple").setDisabled();
 let qfour = new MessageButton().setLabel("4️").setID(calculator_4).setStyle("gray").setDisabled();
 let qfive = new MessageButton().setLabel("5️").setID(calculator_5).setStyle("gray").setDisabled();
 let qsix = new MessageButton().setLabel("6️").setID(calculator_6).setStyle("gray").setDisabled();
 let qstar = new MessageButton().setLabel("x").setID(calculator_star).setStyle("blurple").setDisabled();
 let qone = new MessageButton().setLabel("1️").setID(calculator_1).setStyle("gray").setDisabled();
 let qtwo = new MessageButton().setLabel("2️").setID(calculator_2).setStyle("gray").setDisabled();
 let qthree = new MessageButton().setLabel("3️").setID(calculator_3).setStyle("gray").setDisabled();
 let qminus = new MessageButton().setLabel("-").setID(calculator_minus).setStyle("blurple").setDisabled();
 let qzero = new MessageButton().setLabel("0️").setID(calculator_0).setStyle("gray").setDisabled();
 let qdot = new MessageButton().setLabel(".").setID(calculator_dot).setStyle("blurple").setDisabled();
 let qequal = new MessageButton().setLabel("=").setID(calculator_equal).setStyle("green").setDisabled();
 let qplus = new MessageButton().setLabel("+").setID(calculator_plus).setStyle("blurple").setDisabled();
 let qbackspace = new MessageButton().setLabel("⌫").setID(calculator_backspace).setStyle("red").setDisabled();
 let qdestroy = new MessageButton().setLabel("DC").setID(calc_irrc).setStyle("red").setDisabled();
 let qpercent = new MessageButton().setLabel("%").setID(calc_percent).setStyle("blurple").setDisabled();
 const filter = (m) => m.clicker.user.id === message.author.id;

 message.channel
  .send({
   embed: new MessageEmbed() // Prettier
    .setTitle("🔢 Calculator")
    .setDescription(stringify)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    ),
   components: [
    {
     type: 1,
     components: [e1, e2, uppercase, percent, ac],
    },
    {
     type: 1,
     components: [seven, eight, nine, slash, destroy],
    },
    {
     type: 1,
     components: [four, five, six, star, backspace],
    },
    {
     type: 1,
     components: [one, two, three, minus, empty],
    },
    {
     type: 1,
     components: [dot, zero, equal, plus, empty],
    },
   ],
  })
  .then(async (msg) => {
   async function edit() {
    msg.edit({
     embed: new MessageEmbed() // Prettier
      .setTitle("🔢 Calculator")
      .setDescription(stringify)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      ),
     components: [
      {
       type: 1,
       components: [e1, e2, uppercase, percent, ac],
      },
      {
       type: 1,
       components: [seven, eight, nine, slash, destroy],
      },
      {
       type: 1,
       components: [four, five, six, star, backspace],
      },
      {
       type: 1,
       components: [one, two, three, minus, empty],
      },
      {
       type: 1,
       components: [dot, zero, equal, plus, empty],
      },
     ],
    });
   }
   async function lock() {
    msg.edit({
     embed: new MessageEmbed() // Prettier
      .setTitle("🔢 Calculator")
      .setDescription(stringify)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      ),
     components: [
      {
       type: 1,
       components: [qe1, qe2, quppercase, qpercent, qac],
      },
      {
       type: 1,
       components: [qseven, qeight, qnine, qslash, qdestroy],
      },
      {
       type: 1,
       components: [qfour, qfive, qsix, qstar, qbackspace],
      },
      {
       type: 1,
       components: [qone, qtwo, qthree, qminus, empty],
      },
      {
       type: 1,
       components: [qdot, qzero, qequal, qplus, empty],
      },
     ],
    });
   }
   const calc = msg.createButtonCollector(filter);

   calc.on("collect", async (btn) => {
    if (btn.clicker.user.id !== message.author.id) {
     return btn.defer();
    }

    btn.defer();

    switch (btn.id) {
     case calculator_0:
      str += "0";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_1:
      str += "1";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_2:
      str += "2";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_3:
      str += "3";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_4:
      str += "4";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_5:
      str += "5";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_6:
      str += "6";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_7:
      str += "7";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_8:
      str += "8";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_9:
      str += "9";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_plus:
      str += "+";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_minus:
      str += "-";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_devide:
      str += "/";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_uppercase:
      str += "^";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_star:
      str += "*";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_dot:
      str += ".";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_clear:
      str = " ";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_e1:
      str += "(";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_e2:
      str += ")";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
     case calculator_backspace:
      if (str === " " || str === "" || str === null || str === undefined) {
       return;
      } else {
       str = str.split("");
       str.pop();
       str = str.join("");

       stringify = "```\n" + str + "\n```";
       edit();
       break;
      }
     case calc_percent:
      str += "%";
      stringify = "```\n" + str + "\n```";
      edit();
      break;
    }

    if (btn.id === calculator_equal) {
     if (str === " " || str === "" || str === null || str === undefined) {
      return;
     } else {
      try {
       str += " = " + require("mathjs").evaluate(str);
       stringify = "```\n" + str + "\n```";
       edit();
       str = " ";
       stringify = "```\n" + str + "\n```";
      } catch (e) {
       str = "Invalid Question Entered";
       stringify = "```\n" + str + "\n```";
       edit();
       str = " ";
       stringify = "```\n" + str + "\n```";
      }
     }
    } else if (btn.id === calc_irrc) {
     str = 'Calculator disabled! To run calculator again please type "' + prefix + ' calculator --gui"';
     stringify = "```\n" + str + "\n```";
     edit();
     calc.stop();
     lock();
    }
   });
  });
};

module.exports.calc;
