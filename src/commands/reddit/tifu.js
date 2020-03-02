import fetch from 'node-fetch';

export default class Tifu {
  static name = 'tifu';
  static aliases = [];
  static description = "Returns a recent post from the 'TIFU' subreddit";

  static run(bot, message, args) {
    const postCollection = [];
    const postsList = [];

    const getPosts = fetch('https://www.reddit.com/r/tifu/new.json?sort=hot')
      .then(res => res.json())
      .then(json => {
        json.data.children.map(postData => {
          let postTitle = postData.data.title;
          let postUrl = postData.data.url;
          let postContent = postData.data.selftext;
          postsList.push(`<${postUrl}>`);
          if (postContent.length <= 1750) {
            postCollection.push([postTitle, postContent, postUrl]);
          }
        });
      });

    if (args == 'list') {
      return getPosts.then(() => {
        message.channel.send('\u200b\n' + postsList.slice(0, 20).join('\n'));
      });
    }

    getPosts.then(() => {
      message.channel.send(
        '\u200b\n' +
          postCollection[Math.floor(Math.random() * postCollection.length)]
      );
      postCollection.splice(
        [Math.floor(Math.random() * postCollection.length)],
        1
      );
    });
  }
}
