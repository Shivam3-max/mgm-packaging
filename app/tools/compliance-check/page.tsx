import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ComplianceClient from "./ComplianceClient";

export const metadata: Metadata = {
  title: "Plastic Rules Checker — Does the 120-Micron Rule Apply?",
  description:
    "Three questions to find out whether India's 120-micron carry bag rule, Rule 11A marking or EPR registration apply to your packaging.",
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Plastic rules checker"
      title="Which plastic rules actually apply to your bag?"
      lede="Almost every buyer we speak to believes their packaging must be 120 micron. Almost none of them are right — that rule governs carry bags, not product packaging. Three questions and you will know where you stand."
      footnote={
        <p>
          This tool follows the structure of the Plastic Waste Management Rules and their
          amendments as we understand them. It is written to help you ask your adviser a
          better question, not to answer it for them. We are a polybag manufacturer, not a
          law firm — and any supplier who tells you otherwise is selling something.
        </p>
      }
    >
      <ComplianceClient />
    </ToolShell>
  );
}
