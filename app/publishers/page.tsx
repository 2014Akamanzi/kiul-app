"use client";
import { useState } from "react";
import Container from '../components/Container';

export default function PublishersPage() {
  return (
    <Container>

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-semibold text-[var(--kiul-emerald-900)]">
          KIUL Publishing Hub
        </h1>

        {/* UNDERLINE */}
        <div className="w-24 h-1 bg-[var(--kiul-emerald-500)] mt-3 mb-[var(--space-lg)]"></div>

        {/* INTRO */}
        <p className="text-lg leading-relaxed text-[var(--kiul-text-dark)] mb-[var(--space-lg)]">
          The Katoki Institute for Ubuntu Leadership (KIUL) is committed to 
          producing and disseminating high-quality academic and reflective 
          publications grounded in Ubuntu philosophy, justice, collective agency, 
          and African intellectual traditions. This Publishing Hub brings together 
          our journals, books, working papers, blogs, and conference outputs under 
          a unified publishing policy and editorial structure.
        </p>

        {/* ---------- COLLAPSIBLE SECTION COMPONENT ---------- */}
        <Section
          title="Commons, Justice & Development Journal (CJDJ)"
          content={
            <div className="space-y-6">

              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                The Commons, Justice & Development Journal (CJDJ) is KIUL's 
                flagship peer-reviewed journal dedicated to advancing scholarship 
                on justice, public goods, governance, Ubuntu ethics, and 
                development across Africa. All CJDJ articles are freely accessible 
                in alignment with KIUL's commitment to open knowledge.
              </p>

              <h3 className="text-xl font-semibold text-[var(--kiul-emerald-900)]">Aims & Scope</h3>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                CJDJ publishes work that interrogates structural inequalities, 
                commons management, public leadership, gendered development, 
                youth empowerment, and the philosophy of Ubuntu. Interdisciplinary 
                contributions are encouraged.
              </p>

              <h3 className="text-xl font-semibold text-[var(--kiul-emerald-900)]">Scientific Committee</h3>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                The Scientific Committee oversees the academic integrity of CJDJ. 
                Members are drawn from African universities and the diaspora with 
                expertise in governance, philosophy, anthropology, development 
                studies, environmental justice, and law.
              </p>

              <h3 className="text-xl font-semibold text-[var(--kiul-emerald-900)]">Editorial Board</h3>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                The Editorial Board manages the peer-review workflow, assigns 
                reviewers, issues decisions, and ensures timely communication with 
                authors. The Board upholds KIUL's ethical standards in line with 
                Ubuntu principles of fairness, respect, and intellectual openness.
              </p>

              <h3 className="text-xl font-semibold text-[var(--kiul-emerald-900)]">Reviewers</h3>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                CJDJ maintains a pool of qualified reviewers acknowledged annually 
                for their contributions to African scholarship.
              </p>

              <h3 className="text-xl font-semibold text-[var(--kiul-emerald-900)]">Author Guidelines</h3>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                Full guidelines for CJDJ submissions will be provided here, 
                including formatting, anonymity requirements, referencing style, 
                review timelines, ethical compliance, and submission procedures.
              </p>

              <h3 className="text-xl font-semibold text-[var(--kiul-emerald-900)]">Archive</h3>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                Published CJDJ articles will appear here with free PDF access.
              </p>
            </div>
          }
        />

        <Section
          title="Academic Books"
          content={
            <div className="space-y-6">
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                KIUL publishes scholarly books that advance leadership, Ubuntu, 
                development studies, justice, gender, and African knowledge 
                systems. Summaries and abstracts are freely accessible, but full 
                copies are provided upon request via{" "}
                <strong>info.kiul@katokifoundation.org</strong>.
              </p>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                Book entries and summaries will be displayed here.
              </p>
            </div>
          }
        />

        <Section
          title="Spirituality, Motivation & Self-Help Books"
          content={
            <div className="space-y-6">
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                These works support personal growth, emotional healing, resilience, 
                and Ubuntu-inspired reflection. Summaries are freely accessible; 
                full copies require direct request by email.
              </p>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                Book summaries and abstracts will appear here.
              </p>
            </div>
          }
        />

        <Section
          title="Conference Proceedings"
          content={
            <div className="space-y-6">
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                KIUL conference proceedings capture intellectual dialogues, keynote 
                messages, and papers presented at KIUL events. Abstracts are free; 
                full access is available upon request.
              </p>
            </div>
          }
        />

        <Section
          title="KIUL Working Paper Series"
          content={
            <div className="space-y-6">
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                The KIUL Working Paper Series provides early-stage scholarship on 
                Ubuntu leadership, community empowerment, development practice, 
                governance, and social transformation. Working papers are freely 
                downloadable.
              </p>

              <p className="leading-relaxed text-[var(--kiul-text-dark)] font-medium">
                Mandatory Presentation Requirement:
              </p>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                All authors must present their working paper in a KIUL seminar or 
                webinar before final acceptance.
              </p>

              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                A list of working papers will be displayed here.
              </p>
            </div>
          }
        />

        <Section
          title="Blogs & Essays"
          content={
            <div className="space-y-6">
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                The KIUL Blog features reflective essays, Ubuntu leadership 
                commentaries, philosophical insights, and transformative narratives. 
                All posts are freely accessible.
              </p>
              <p className="leading-relaxed text-[var(--kiul-text-dark)]">
                Blog entries will be shown here.
              </p>
            </div>
          }
        />

        <Section
          title="KIUL Unified Publishing Policy"
          content={
            <div className="space-y-6 leading-relaxed text-[var(--kiul-text-dark)]">
              <p>
                KIUL adheres to a unified publishing policy that governs all 
                publications across CJDJ, books, working papers, conference 
                proceedings, and blog contributions. This includes intellectual 
                integrity, Ubuntu-based ethics, quality assurance, peer-review 
                standards, author responsibilities, open-access principles, and 
                editorial transparency.
              </p>
              <p>
                Detailed policy documents will appear here.
              </p>
            </div>
          }
        />

        <Section
          title="Guidelines for Authors"
          content={
            <div className="space-y-6 leading-relaxed text-[var(--kiul-text-dark)]">
              <p>
                KIUL provides clear guidelines for authors submitting journal 
                articles, book proposals, working papers, conference contributions, 
                and blogs. These guidelines ensure quality, ethical compliance, 
                and alignment with KIUL's Ubuntu-based scholarly mission.
              </p>
              <p>Guidelines will be displayed here.</p>
            </div>
          }
        />

        <Section
          title="Contact for Publishing Enquiries"
          content={
            <p className="leading-relaxed text-[var(--kiul-text-dark)]">
              For questions about submissions, book access, or publication policies, 
              please contact:{" "}
              <strong>info.kiul@katokifoundation.org</strong>.
            </p>
          }
        />
    </Container>
  );
}

/* ---------- COLLAPSIBLE SECTION COMPONENT ---------- */
interface SectionProps {
  title: string;
  content: React.ReactNode;
}

function Section({ title, content }: SectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] px-4 py-4 rounded-xl shadow-sm hover:border-[var(--kiul-emerald-500)] transition-all"
      >
        <span className="text-xl font-semibold text-[var(--kiul-emerald-900)]">
          {title}
        </span>
      </button>

      {open && (
        <div className="mt-4 bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] p-6 rounded-xl shadow-sm">
          {content}
        </div>
      )}
    </div>
  );
}
