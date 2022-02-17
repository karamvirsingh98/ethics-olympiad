import feathers from "@feathersjs/feathers";
import primus from "@feathersjs/primus-client";
import auth from "@feathersjs/authentication-client";
import { Score } from "@ethics-olympiad/types";

export function setupClient(baseURL: string) {
  const { Primus } = window as any;
  const socket = new Primus(baseURL);
  const client = feathers();
  client.configure(primus(socket));
  client.configure(auth());
  return client;
}

//returns string if valid, or undefined if invalid
export function generateEmbed(url: string) {
  //for youtube urls
  if (url.includes("youtube") || url.includes("youtu.be")) {
    const regExp =
      /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : undefined;
  }

  //for vimeo urls
  else if (url.includes("vimeo")) {
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(regExp);
    return match ? `https://player.vimeo.com/video/${match[1]}` : undefined;
  }

  //for any other url
  else return undefined;
}