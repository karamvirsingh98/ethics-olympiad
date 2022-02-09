export function generateEmbed(url: string) {
  //for youtube urls
  if (url.includes("youtube") || url.includes("youtu.be")) {
    const regExp =
      /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "invalid url";
  }

  //for vimeo urls
  else if (url.includes("vimeo")) {
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(regExp);
    return match ? `https://player.vimeo.com/video/${match[1]}` : "invalid url";
  }

  //for any other url
  else return "invalid url";
};
