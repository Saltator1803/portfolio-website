"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import data from "@/data/profile.json";

// High-end styling matching the user's professional resume layout
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 40,
    fontSize: 9.5,
    color: "#222222",
    fontFamily: "Helvetica",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1d4ed8", // Professional blue color
    letterSpacing: 0.5,
  },
  contactGrid: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 4,
    fontSize: 8.5,
    color: "#333333",
  },
  contactItem: {
    marginHorizontal: 4,
  },
  linkedinLink: {
    color: "#1d4ed8",
    textDecoration: "underline",
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    borderBottomWidth: 1.2,
    borderBottomColor: "#1d4ed8",
    paddingBottom: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#1d4ed8",
    textTransform: "capitalize",
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#222222",
  },
  skillsText: {
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#222222",
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#000000",
    fontSize: 9.5,
    flex: 1,
    paddingRight: 10,
  },
  itemDuration: {
    fontSize: 9,
    color: "#333333",
    fontWeight: "normal",
    textAlign: "right",
  },
  itemSubDetails: {
    fontSize: 9,
    color: "#555555",
    marginTop: 1,
    fontStyle: "italic",
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 2.5,
    paddingLeft: 8,
  },
  bulletSymbol: {
    width: 10,
    fontSize: 9.5,
    color: "#222222",
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: "#222222",
    lineHeight: 1.35,
  }
});

// Structure the static document schema matching the PDF exactly
// Structure the static document schema matching the PDF exactly
export const MyResumeDoc = () => {
  const allSkills = [
    ...data.skills.product,
    ...data.skills.technical,
    ...data.skills.other
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Panel */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.profile.name}</Text>
          <View style={styles.contactGrid}>
            <Text style={styles.contactItem}>{data.profile.phone} |</Text>
            <Text style={styles.contactItem}>{data.profile.email} |</Text>
            <Text style={styles.contactItem}>
              LinkedIn: <Link src={`https://${data.profile.linkedin}`} style={styles.linkedinLink}>{data.profile.name}</Link>
            </Text>
          </View>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Executive Summary</Text>
          </View>
          <Text style={styles.summaryText}>{data.profile.summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills</Text>
          </View>
          <Text style={styles.skillsText}>{allSkills.join(" | ")}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.item} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {edu.institution} – <Text style={{ fontWeight: "normal" }}>{edu.degree}</Text>
                </Text>
                <Text style={styles.itemDuration}>
                  {edu.duration}{edu.location ? `, ${edu.location}` : ""}
                </Text>
              </View>
              <Text style={styles.itemSubDetails}>{edu.details}</Text>
            </View>
          ))}
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
          </View>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={styles.item} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {exp.company} – <Text style={{ fontWeight: "normal" }}>{exp.role}</Text>
                </Text>
                <Text style={styles.itemDuration}>{exp.duration}</Text>
              </View>
              {exp.bulletPoints && exp.bulletPoints.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletRow}>
                  <Text style={styles.bulletSymbol}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Products and Projects */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Products and Projects</Text>
          </View>
          {data.projects.map((proj: any, idx) => {
            const bullets = [];
            if (proj.context) bullets.push(`Context: ${proj.context}`);
            if (proj.problem) bullets.push(`Problem: ${proj.problem}`);
            if (proj.solutionTradeoffs) bullets.push(`Solution: ${proj.solutionTradeoffs}`);
            if (proj.expectedOutcome) bullets.push(`Outcome: ${proj.expectedOutcome}`);
            
            return (
              <View key={idx} style={styles.item} wrap={false}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {proj.title} <Text style={{ fontWeight: "normal" }}>({proj.tagline.split(" | ")[0]}) | {proj.tagline.split(" | ").slice(1).join(" | ")}</Text>
                  </Text>
                  <Text style={styles.itemDuration}>{proj.duration}</Text>
                </View>
                {bullets.map((bullet, bIdx) => (
                  <View key={bIdx} style={styles.bulletRow}>
                    <Text style={styles.bulletSymbol}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>

        {/* Certifications and Leadership */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Certifications and Leadership</Text>
          </View>
          {data.certifications.map((cert, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Text style={styles.bulletSymbol}>•</Text>
              <Text style={styles.bulletText}>{cert}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Dynamically load download trigger to bypass standard SSR document execution errors
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <p className="text-luxuryMuted animate-pulse font-mono">Readying engine compiler...</p> }
);

export default function ResumeBuilder() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="resume-builder" className="relative bg-background py-20 px-8 md:px-20 z-20 flex flex-col items-center">
      <div className="max-w-5xl text-center space-y-6">
        <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono">
          /Happy to see you
        </h2>
        <h3 className="text-4xl md:text-5xl font-light text-foreground tracking-widest uppercase">
          Resume
        </h3>
        <p className="text-sm md:text-base text-luxuryMuted font-light max-w-xl leading-relaxed mx-auto">
          {data.profile.title}
        </p>

        <div className="pt-4">
          <a
            href="/Sanju_Chowdhury_Product_Resume.pdf"
            download="Sanju_Chowdhury_Product_Resume.pdf"
            className="px-10 py-5 rounded-full border border-luxuryGold text-luxuryGold text-xs tracking-superWide uppercase hover:bg-luxuryGold hover:text-black transition-all duration-500 font-semibold shadow-goldGlow inline-block cursor-pointer"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </div>
    </section>
  );
}
