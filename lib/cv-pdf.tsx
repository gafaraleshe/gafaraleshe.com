/*
 * The downloadable CV: lib/cv.ts typeset as an A4 PDF with @react-pdf/renderer.
 * Served by app/cv.pdf/route.ts, which renders it once per deploy, so the PDF
 * always matches the home page.
 *
 * Plain Helvetica, black on white and a single column, so it prints cleanly
 * and applicant tracking systems can read every line.
 */

import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  CV_PDF,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  NAME,
  PHONE,
  PHONE_HREF,
  SITE_URL,
  TITLE,
  certifications,
  education,
  experience,
  projects,
  skills,
  summary,
} from "@/lib/cv";

// Wrap whole words only; the default hyphenator splits "TypeScript".
Font.registerHyphenationCallback(word => [word]);

const INK = "#111111";
const MUTED = "#555555";
const FAINT = "#8a8a8a";
const RULE = "#d4d4d4";

const s = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.4,
    color: INK,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    letterSpacing: -0.3,
    lineHeight: 1.1,
  },
  role: { marginTop: 3, fontSize: 10.5, color: MUTED },
  contact: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 8.75,
    color: MUTED,
  },
  link: { color: INK, textDecoration: "none" },
  sep: { color: FAINT },
  summary: { marginTop: 10, color: "#333333" },

  section: { marginTop: 13 },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    paddingBottom: 3,
    marginBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: RULE,
  },

  entry: { marginBottom: 7 },
  entryHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10, flexShrink: 1 },
  entryMeta: { fontSize: 8.75, color: MUTED, marginLeft: 12 },
  entrySub: { fontSize: 8.75, color: MUTED, marginTop: 1 },

  bullets: { marginTop: 3 },
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  dot: { width: 10, color: FAINT },
  bulletText: { flex: 1 },

  skillRow: { flexDirection: "row", marginBottom: 2 },
  skillCat: { width: 92, fontFamily: "Helvetica-Bold" },
  skillList: { flex: 1, color: "#333333" },

  line: { marginBottom: 2 },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: MUTED },

  footer: {
    position: "absolute",
    bottom: 18,
    left: 42,
    right: 42,
    fontSize: 7.5,
    color: FAINT,
  },
});

// "Dec 22" -> "Dec 2022", "Now" -> "Present".
function longDate(value: string) {
  if (value === "Now") return "Present";
  return value.replace(/\b(\d{2})$/, "20$1");
}

const bare = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      {/* Keep each heading with at least the start of its section. */}
      <Text style={s.label} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <View style={s.bullets}>
      {items.map(item => (
        <View key={item} style={s.bullet} wrap={false}>
          <Text style={s.dot}>•</Text>
          <Text style={s.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function CvDocument() {
  const contact = [
    { label: PHONE, href: PHONE_HREF },
    { label: EMAIL, href: `mailto:${EMAIL}` },
    { label: bare(SITE_URL), href: SITE_URL },
    { label: bare(GITHUB_URL), href: GITHUB_URL },
    { label: bare(LINKEDIN_URL), href: LINKEDIN_URL },
  ];
  const updated = new Date().toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <Document
      title={`${NAME} — CV`}
      author={NAME}
      subject={`${TITLE} CV`}
      keywords={skills.flatMap(([, items]) => items).join(", ")}
      creator={SITE_URL}
    >
      <Page size="A4" style={s.page}>
        {/* ── Header ── */}
        <Text style={s.name}>{NAME}</Text>
        <Text style={s.role}>
          {TITLE} · Computer Science Student · {LOCATION}
        </Text>
        <View style={s.contact}>
          {contact.map((c, i) => (
            <Text key={c.href}>
              {i > 0 && <Text style={s.sep}>{"\u00a0\u00a0|\u00a0\u00a0"}</Text>}
              <Link src={c.href} style={s.link}>
                {c.label}
              </Link>
            </Text>
          ))}
        </View>
        <Text style={s.summary}>{summary}</Text>

        {/* ── Skills ── */}
        <Section title="Technical skills">
          {skills.map(([category, items]) => (
            <View key={category} style={s.skillRow}>
              <Text style={s.skillCat}>{category}</Text>
              <Text style={s.skillList}>{items.join(", ")}</Text>
            </View>
          ))}
        </Section>

        {/* ── Experience ── */}
        <Section title="Experience">
          {experience.map(exp => (
            <View key={exp.company} style={s.entry}>
              <View style={s.entryHead} wrap={false}>
                <Text style={s.entryTitle}>
                  {exp.role} ·{" "}
                  <Link src={exp.companyHref} style={s.link}>
                    {exp.company}
                  </Link>
                </Text>
                <Text style={s.entryMeta}>
                  {exp.location} | {longDate(exp.start)} – {longDate(exp.end)}
                </Text>
              </View>
              <Bullets items={exp.bullets} />
            </View>
          ))}
        </Section>

        {/* ── Projects ── */}
        <Section title="Projects">
          {projects.map(project => (
            // Short enough to keep whole: move to the next page, not split.
            <View key={project.name} style={s.entry} wrap={false}>
              <View style={s.entryHead} wrap={false}>
                <Text style={s.entryTitle}>
                  {project.name}
                  <Text style={[s.muted, { fontFamily: "Helvetica" }]}>
                    {" "}
                    — {project.tagline}
                  </Text>
                </Text>
                {project.links ? (
                  <Text style={s.entryMeta}>
                    {project.links.map((l, i) => (
                      <Text key={l.href}>
                        {i > 0 && " | "}
                        <Link src={l.href} style={s.link}>
                          {l.label}
                        </Link>
                      </Text>
                    ))}
                  </Text>
                ) : (
                  project.context && (
                    <Text style={s.entryMeta}>{project.context}</Text>
                  )
                )}
              </View>
              <Text style={s.entrySub}>{project.stack.join(" · ")}</Text>
              <Bullets items={project.bullets} />
            </View>
          ))}
        </Section>

        {/* ── Education ── */}
        <Section title="Education">
          {education.map(item => (
            <View key={item.name} style={s.line} wrap={false}>
              <Text>
                <Text style={s.bold}>{item.name}</Text>
                <Text style={s.muted}> — {item.detail}</Text>
              </Text>
              {item.note && (
                <Text style={s.entrySub}>Relevant modules: {item.note}</Text>
              )}
            </View>
          ))}
        </Section>

        {/* ── Certifications ── */}
        <Section title="Certifications">
          {certifications.map(item => (
            <Text key={item.name} style={s.line}>
              <Text style={s.bold}>{item.name}</Text>
              <Text style={s.muted}> — {item.detail}</Text>
            </Text>
          ))}
        </Section>

        {/* Static text: a render-prop footer silently drops out of this
            layout in @react-pdf/renderer 4.9. */}
        <Text style={s.footer} fixed>
          Latest version at{" "}
          <Link src={`${SITE_URL}${CV_PDF}`} style={{ color: FAINT }}>
            {bare(SITE_URL)}
            {CV_PDF}
          </Link>{" "}
          · {updated}
        </Text>
      </Page>
    </Document>
  );
}
