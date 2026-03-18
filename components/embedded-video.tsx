import { getEmbedUrl } from "@/lib/embed";

export const EmbeddedVideo = ({ url }: { url: string }) => {
  const result = getEmbedUrl(url);

  if (!result.success) {
    return (
      <div className="bg-accent grid place-items-center aspect-video rounded-2xl">
        Invalid video URL
      </div>
    );
  }

  return (
    <iframe src={result.embedUrl} className="w-full aspect-video rounded-2xl" />
  );
};
