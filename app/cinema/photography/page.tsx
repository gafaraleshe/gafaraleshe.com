import type { Metadata } from "next";
import { PhotographyView } from "./PhotographyView";

export const metadata: Metadata = {
  title: "Photography — Gafar Aleshe Cinema",
  description:
    "Concert, event, birthday, football, lifestyle, nightlife and brand photography by Gafar Aleshe (SHOTBYGAFAR).",
  openGraph: {
    title: "Photography — Gafar Aleshe",
    description:
      "Concerts, events, birthdays, football, lifestyle, nightlife and brand work by SHOTBYGAFAR.",
  },
};

export default function PhotographyPage() {
  return <PhotographyView />;
}
