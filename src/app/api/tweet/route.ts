import { NextRequest, NextResponse } from "next/server";

function parseText(html: string): string {
  // Grab inner content of the first <p> inside the blockquote
  const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!match) return "";
  return match[1]
    .replace(/<br\s*\/?>/gi, "\n")  // keep line breaks
    .replace(/<[^>]+>/g, "")        // strip remaining tags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .trim();
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  const oEmbedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=1&dnt=true`;

  const res = await fetch(oEmbedUrl, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch tweet" }, { status: res.status });
  }

  const data = await res.json();

  // author_url is e.g. "https://twitter.com/vansh_codes"
  const handle = (data.author_url as string)?.split("/").filter(Boolean).pop() ?? "";
  const text = parseText(data.html as string);
  const avatarUrl = handle ? `https://unavatar.io/x/${handle}` : "";

  return NextResponse.json({
    author_name: data.author_name as string,
    handle,
    text,
    avatarUrl,
    tweetUrl: url,
  });
}
