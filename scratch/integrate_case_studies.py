import os
import re

# File paths
source_dir = r"C:\Users\ASUS\Desktop\New folder\project"
output_dir = r"C:\Users\ASUS\Desktop\New folder\public\case-studies"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Configuration mapping for all 8 case studies
case_studies_config = {
    "blinkit-case-study.html": {
        "month_year": "March 2026",
        "track": "Growth & Operations",
        "hex": "#e8a33d",
        "rgb": "232,163,61",
        "personal_connection": "Having worked on systems that depended on accurate real-time data, I'd flag that hyperlocal demand forecasting across 2,000+ dark stores isn't one model — it's likely hundreds of thinly-trained local models with a cold-start problem every time a new store opens, which is a harder infrastructure and MLOps challenge than the \"AI angle\" framing usually lets on."
    },
    "cred-case-study.html": {
        "month_year": "June 2026",
        "track": "Monetization Strategy",
        "hex": "#c5a880",  # Muted gold / bronze
        "rgb": "197,168,128",
        "personal_connection": "The engineering challenge underneath this is harder than it sounds: a \"continuously updating\" behavioral score requires streaming transactional data into a live model rather than the batch-scored, periodically-updated systems most credit infrastructure was built on — that shift from batch to real-time is a significant backend investment, not just a data science one."
    },
    "anthropic-case-study.html": {
        "month_year": "May 2026",
        "track": "Enterprise Strategy",
        "hex": "#6366f1",  # Indigo/cool blue
        "rgb": "99,102,241",
        "personal_connection": "From a systems perspective, being genuinely available on AWS Bedrock, Vertex AI, and Azure at parity isn't just a partnerships win — each cloud has its own serving stack, latency profile, and deployment tooling, so maintaining consistent model behavior across all three is real, ongoing engineering overhead that makes the \"safety as GTM\" story credible rather than just a marketing line."
    },
    "duolingo-case-study.html": {
        "month_year": "May 2026",
        "track": "Growth & Retention",
        "hex": "#22c55e",  # Green
        "rgb": "34,197,94",
        "personal_connection": "As someone who's built features that lived or died on daily engagement, I'd point out that curriculum content is now commoditized by any LLM, but a real-time, individualized streak-risk prediction system (knowing which specific users are about to churn today, not on average) is a genuine ML engineering moat — that's the harder system to copy, not the lesson plans."
    },
    "pubg-bgmi-case-study.html": {
        "month_year": "May 2026",
        "track": "Engagement Design",
        "hex": "#f97316",  # Red-Orange
        "rgb": "249,115,22",
        "personal_connection": "The less-discussed part of this story is the backend rebuild: relaunching as a India-specific app after a ban likely meant standing up separate data residency and compliance infrastructure, and maintaining that alongside the global PUBG codebase — a real technical-debt cost of operating under two regulatory regimes, not just a rebrand."
    },
    "google-vs-microsoft-case-study.html": {
        "month_year": "May 2026",
        "track": "AI Platform Strategy",
        "hex": "#8b5cf6",  # Purple
        "rgb": "139,92,246",
        "personal_connection": "Having worked inside a codebase with legacy integrations, I'd note that Copilot's advantage isn't the model — it's that embedding it across Word, Excel, and Teams means integrating with years of existing enterprise backend (Graph API, permissions, legacy auth) in a way a standalone consumer app like Gemini never has to."
    },
    "krutrim-case-study.html": {
        "month_year": "March 2026",
        "track": "Post-Mortem Review",
        "hex": "#991b1b",  # Muted grey-red
        "rgb": "153,27,27",
        "personal_connection": "The technical reality underneath this failure is that training a frontier foundation model from scratch requires sustained compute procurement and MLOps talent retention over years, not quarters — a funding-cycle-driven startup timeline is often mismatched with that infrastructure reality, which may explain the pivot away from in-house models faster than any single product decision does."
    },
    "meta-facebook-case-study.html": {
        "month_year": "May 2026",
        "track": "Platform Defense",
        "hex": "#0d9488",  # Deep teal
        "rgb": "13,148,136",
        "personal_connection": "As an engineer, I'd read Meta's \"switching cost\" less as a user-psychology story and more as a deliberate infrastructure decision — account graph and cross-app identity systems that were engineered to make data portability hard, which is a technical choice with a business outcome, not an accident of platform growth."
    }
}

# Run updates across all files
for file_name, cfg in case_studies_config.items():
    source_path = os.path.join(source_dir, file_name)
    output_path = os.path.join(output_dir, file_name)
    
    if not os.path.exists(source_path):
        print(f"Skipping {file_name} as it does not exist.")
        continue
        
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Reframe simulated role tagline in the `.hero-sub` block
    # Standard formats to replace:
    # "Role simulated: AI Product Manager, [Track]."
    # "Role simulated: AI Platform Strategy Lead."
    role_pattern = r"Role simulated: (?:AI Product Manager, [^.\n]+|AI Platform Strategy Lead)\."
    replacement_role = f"Independent case study — {cfg['track']} track."
    content, count_step1 = re.subn(role_pattern, replacement_role, content, flags=re.IGNORECASE)

    # Step 2: Add footer methodology footnote inside the <footer> tag
    footer_pattern = r"<footer>(.*?)(<\/footer>)"
    footer_note = f'\\1<br><span style="display: block; margin-top: 6px; opacity: 0.75; font-size: 11px;">This is an independent, self-directed practice case study; AI was utilized for research and structuring support, while final problem framing, analysis, and strategic judgment were developed solely by me.</span>\\2'
    content, count_step2 = re.subn(footer_pattern, footer_note, content)

    # Step 3: Add personal-connection sentence in the "My Call" section before closing </section>
    call_section_pattern = r'(<section class="card" id="call">[\s\S]*?)(<\/section>)'
    dev_perspective_html = f'\\1<p style="margin-top: 18px; border-top: 1px dashed var(--line); padding-top: 14px; color: var(--cyan);"><strong style="color: var(--amber);">Developer Perspective:</strong> {cfg["personal_connection"]}</p>\\2'
    content, count_step3 = re.subn(call_section_pattern, dev_perspective_html, content)

    # Step 4: Visual Accent replacements (Replace --amber hex and matching colors)
    # Original values to replace: #e8a33d and rgba(232,163,61,
    content = content.replace("#e8a33d", cfg["hex"])
    content = content.replace("rgba(232,163,61,", f"rgba({cfg['rgb']},")

    # Step 5: Add a dateline note right below eyebrow tag
    eyebrow_pattern = r'(<div class="eyebrow">[^<]+<\/div>)'
    dateline_html = f'\\1\n      <div class="dateline" style="font-family:\'IBM Plex Mono\', monospace; font-size:11px; color:var(--muted-2); margin:-10px 0 20px; letter-spacing:0.04em; text-transform:uppercase;">Analysis as of {cfg["month_year"]} — figures may have moved since.</div>'
    content, count_step5 = re.subn(eyebrow_pattern, dateline_html, content)

    # Write out the modified files
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed {file_name}: taglines={count_step1}, footnotes={count_step2}, connection={count_step3}, dateline={count_step5}")

print("Completed processing all case study files.")
