function Funcs(message) {

    //# Functions
  
    this.send = (textToSend, x, timeToDelete) => {
      message.channel.send(`**__${textToSend}__**`).then(m => {
        if (x === true) {
          m.react("❌");
        } else if (x === false) {
          m.react("✅");
        } else {
          
        }
        if (timeToDelete >= 1) {
          m.delete(timeToDelete);
        }
      });
    };
  
    this.getParent = command => {
      const groups = ["fun", "miscellaneous"];
  
      groups.forEach(async group => {
        const ffile = async () => { 
          return require(`./../../commands/${group}/${command}`);
       };
       const file = await ffile().catch((err) => console.log(err));
          if (file) {
            return group;
          } else {
            return;
          }
        return file;
      });
    };
  
    this.trimArray = (arr, maxLen = 10) => {
          if (arr.length > maxLen) {
              const len = arr.length - maxLen;
              arr = arr.slice(0, maxLen);
              arr.push(`${len} more...`);
          }
      return arr;
    }
  
    //# Variables
  
    this.rc = () => {
      return require("randomcolor")({
        alpha: 5
      });
    };
    
  }
  
  module.exports = Funcs;
  