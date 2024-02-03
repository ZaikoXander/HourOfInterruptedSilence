export default function extractYoutubeVideoId(url: string): string | null {
  const regex: RegExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
  const match: RegExpMatchArray | null = url.match(regex)

  return match ? match[1] : null
}
