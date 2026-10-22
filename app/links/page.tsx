/*
 * /links — fetches the latest YouTube upload on the server (re-checked every
 * hour, so a new video appears without a redeploy) and hands it to the
 * client view.
 */

import type { Metadata } from "next";
import { fetchLatestVideo } from "@/lib/youtube";
import LinksView from "./LinksView";

export const revalidate = 3600; // one hour, matching lib/youtube.ts

export const metadata: Metadata = {
  title: "Links — Gafar Aleshe",
  description:
    "Gafar Aleshe's links: socials, the latest YouTube video, projects, résumé and deals.",
};

export default async function Links() {
  const video = await fetchLatestVideo();
  return <LinksView video={video} />;
}
