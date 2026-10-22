/*
 * /cv.pdf — the CV in lib/cv.ts, typeset by lib/cv-pdf.tsx. Rendered once at
 * build time and served statically, so every deploy ships a PDF that matches
 * the home page.
 */

import { renderToBuffer } from "@react-pdf/renderer";
import { CV_FILENAME } from "@/lib/cv";
import { CvDocument } from "@/lib/cv-pdf";

export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(CvDocument());
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${CV_FILENAME}"`,
    },
  });
}
