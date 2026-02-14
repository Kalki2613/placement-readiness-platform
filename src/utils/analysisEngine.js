const SKILL_CATEGORIES = {
    coreCS: ["DSA", "OOP", "DBMS", "OS", "Networks"],
    languages: ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    web: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    data: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    testing: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export const extractSkills = (jdText) => {
    const extracted = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
    const text = jdText.toLowerCase();

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const found = skills.filter(skill => {
            const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(?:^|\\s|[,./;])${escapedSkill.toLowerCase()}(?:$|\\s|[,./;])`, 'i');
            return regex.test(text);
        });
        if (found.length > 0) {
            extracted[category] = found;
        }
    });

    // Check if any skills were found
    const totalFound = Object.values(extracted).flat().length;
    if (totalFound === 0) {
        extracted.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    return extracted;
};

export const calculateReadinessScore = (jdText, company, role, extractedSkills) => {
    let score = 35;

    const categoryCount = Object.values(extractedSkills).filter(arr => arr.length > 0).length;
    score += Math.min(categoryCount * 5, 30);

    if (company && company.trim()) score += 10;
    if (role && role.trim()) score += 10;
    if (jdText.length > 800) score += 10;

    return Math.min(score, 100);
};

export const inferCompanyIntel = (companyName, jdText) => {
    const name = (companyName || "").toLowerCase().trim();
    const enterprises = ["amazon", "google", "microsoft", "meta", "apple", "netflix", "tcs", "infosys", "wipro", "hcl", "accenture", "ibm", "capgemini", "cognizant", "oracle"];

    const isEnterprise = enterprises.some(e => name.includes(e));
    const category = isEnterprise ? "Enterprise (2000+)" : "Startup (<200)";

    // Keyword-based Industry Inference
    const text = (jdText || "").toLowerCase();
    let industry = "Technology Services";

    if (text.includes("bank") || text.includes("finance") || text.includes("insurance") || text.includes("fintech")) {
        industry = "Fintech / Banking";
    } else if (text.includes("health") || text.includes("medical") || text.includes("bio") || text.includes("clinical")) {
        industry = "Healthcare / Biotech";
    } else if (text.includes("shop") || text.includes("retail") || text.includes("e-commerce") || text.includes("commerce")) {
        industry = "E-commerce / Retail";
    } else if (text.includes("game") || text.includes("entertainment") || text.includes("streaming") || text.includes("media")) {
        industry = "Media / Entertainment";
    } else if (text.includes("cyber") || text.includes("security") || text.includes("protection")) {
        industry = "Cybersecurity";
    }

    const hiringFocus = isEnterprise
        ? "High emphasis on DSA, CS Fundamentals (OS/DBMS), and scalable system design logic."
        : "Heavy focus on practical stack depth, project building experience, and immediate problem-solving.";

    return { name: companyName || "", category, industry, hiringFocus, isEnterprise };
};

export const generateRoundMapping = (intel, skills) => {
    const hasWeb = skills.web.length > 0;
    const hasFrontend = skills.web.some(s => ["React", "Next.js", "JavaScript"].includes(s));

    if (intel.isEnterprise) {
        return [
            { roundTitle: "Round 1: Online Assessment", focusAreas: ["Aptitude", "2 DSA Problems"], whyItMatters: "To filter candidates based on core logic and speed." },
            { roundTitle: "Round 2: Technical Interview I", focusAreas: ["DSA (Trees/Graphs)", "Core CS"], whyItMatters: "Deep dive into data structures and computer science foundations." },
            { roundTitle: "Round 3: Technical Interview II", focusAreas: ["Low Level Design", "Projects"], whyItMatters: "Evaluates your ability to write clean, modular, and object-oriented code." },
            { roundTitle: "Round 4: HR / Behavioral", focusAreas: ["Culture Fit", "Situational"], whyItMatters: "Ensures alignment with company values and long-term potential." }
        ];
    } else {
        return [
            { roundTitle: "Round 1: Machine Coding", focusAreas: [`Practical ${hasFrontend ? "UI" : "Feature"} implementation`], whyItMatters: "Validates if you can build real-world components from scratch." },
            { roundTitle: "Round 2: Technical Discussion", focusAreas: ["Project Deep-dive", "Stack depth"], whyItMatters: "Tests your understanding of the tools and choices you made in your projects." },
            { roundTitle: "Round 3: Founder / Culture Fit", focusAreas: ["Vibe check", "Ownership mindset"], whyItMatters: "Startups look for early members who take high ownership and move fast." }
        ];
    }
};

export const analyzeJD = (data) => {
    const extractedSkills = extractSkills(data.jdText);
    const baseScore = calculateReadinessScore(data.jdText, data.company, data.role, extractedSkills);

    const skillConfidenceMap = {};
    Object.values(extractedSkills).flat().forEach(skill => {
        skillConfidenceMap[skill] = 'practice';
    });

    const companyIntel = inferCompanyIntel(data.company, data.jdText);
    const roundMapping = generateRoundMapping(companyIntel, extractedSkills);

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: data.company || "",
        role: data.role || "",
        jdText: data.jdText,
        extractedSkills,
        companyIntel,
        roundMapping,
        checklist: [
            { roundTitle: "Round 1: Aptitude / Basics", items: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Basic Coding MCQ"] },
            { roundTitle: "Round 2: DSA + Core CS", items: ["Array/String Manipulation", "Linked Lists/Trees", "OS Memory Management", "DBMS Normalization"] },
            { roundTitle: "Round 3: Tech Interview", items: ["Project Walkthrough", "System Design Basics", "Problem Solving"] },
            { roundTitle: "Round 4: Managerial / HR", items: ["Strengths & Weaknesses", "Conflict Resolution", "Future Goals"] }
        ],
        plan7Days: [
            { day: "1-2", focus: "Basics + Core CS", tasks: ["Review Operating Systems", "Database Management", "Networks"] },
            { day: "3-4", focus: "DSA + Coding Practice", tasks: ["Practice Array Problems", "String Logic", "Tree Traversals"] },
            { day: "5", focus: "Project + Resume Alignment", tasks: ["Refine Project Descriptions", "Key Performance Metrics"] },
            { day: "6", focus: "Mock Interview Questions", tasks: ["Behavioral Answers", "Technical Deep Dive"] },
            { day: "7", focus: "Revision + Weak Areas", tasks: ["Final Polish", "Confidence Building"] }
        ],
        questions: [
            "Walk me through your most challenging project.",
            "How do you handle technical debt?",
            "Explain a time you disagreed with a team member.",
            "What is your approach to learning a new technology?",
            "Why do you want to join this company specifically?"
        ],
        baseScore,
        skillConfidenceMap,
        finalScore: baseScore
    };
};
