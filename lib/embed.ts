/**
 * Extracts video ID from a YouTube URL.
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 */
function getYouTubeVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?/]+)/
  );
  return match ? match[1] : null;
}

/**
 * Extracts video ID from a Vimeo URL.
 * Supports: vimeo.com/ID, player.vimeo.com/video/ID
 */
function getVimeoVideoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export type EmbedResult =
  | { success: true; embedUrl: string; provider: "youtube" | "vimeo" }
  | { success: false; error: string };

/**
 * Converts a YouTube or Vimeo URL into an embeddable iframe src URL.
 *
 * @param url - A YouTube or Vimeo video URL
 * @returns The embed URL for use in an iframe's src attribute, or an error
 *
 * @example
 * getEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
 * // => { success: true, embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", provider: "youtube" }
 *
 * @example
 * getEmbedUrl("https://vimeo.com/123456789")
 * // => { success: true, embedUrl: "https://player.vimeo.com/video/123456789", provider: "vimeo" }
 */
export function getEmbedUrl(url: string): EmbedResult {
  const trimmed = url.trim();

  const youtubeId = getYouTubeVideoId(trimmed);
  if (youtubeId) {
    return {
      success: true,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      provider: "youtube",
    };
  }

  const vimeoId = getVimeoVideoId(trimmed);
  if (vimeoId) {
    return {
      success: true,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
      provider: "vimeo",
    };
  }

  return {
    success: false,
    error: "Invalid or unsupported video URL. Supported: YouTube, Vimeo",
  };
}
