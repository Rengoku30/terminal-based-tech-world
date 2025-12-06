const output = document.getElementById('output');
const input = document.getElementById('command-input');
const promptStr = "visitor@tech-terminal:~$ ";
let isTyping = false;

const bootSequence = [
    "Initializing Tech Terminal v1.0.0...",
    "Loading kernel modules...",
    "Mounting file systems...",
    "Connecting to neural network...",
    "Access granted.",
    "Welcome to the Tech Industry Tools Terminal.",
    "Type 'help' to see available commands."
];

const toolsData = {
    "AI & Machine Learning": [
        "TensorFlow - Open-source ML library",
        "PyTorch - ML framework",
        "Scikit-learn - ML in Python",
        "Keras - High-level neural networks API",
        "OpenAI API - Access to GPT models",
        "Hugging Face - AI community & models",
        "Pandas - Data analysis",
        "NumPy - Numerical computing",
        "Jupyter Notebooks - Interactive data science",
        "LangChain - Building apps with LLMs"
    ],
    "Cloud & DevOps": [
        "AWS - Amazon Web Services",
        "Azure - Microsoft Cloud",
        "Google Cloud Platform (GCP)",
        "Docker - Containerization",
        "Kubernetes - Container orchestration",
        "Terraform - Infrastructure as Code",
        "Ansible - Configuration management",
        "Jenkins - CI/CD automation",
        "GitLab CI - CI/CD built-in",
        "CircleCI - Continuous integration"
    ],
    "Web Development": [
        "React - UI library",
        "Vue.js - Progressive JS framework",
        "Angular - Web app framework",
        "Next.js - React framework",
        "Node.js - JS runtime",
        "TypeScript - Typed JavaScript",
        "Tailwind CSS - Utility-first CSS",
        "Sass - CSS extension",
        "Webpack - Module bundler",
        "Vite - Frontend build tool"
    ],
    "Cybersecurity": [
        "Wireshark - Network protocol analyzer",
        "Metasploit - Penetration testing framework",
        "Burp Suite - Web security testing",
        "Nmap - Network scanner",
        "Snort - Network intrusion detection",
        "Kali Linux - Security OS distribution",
        "OWASP ZAP - Web app security scanner",
        "HashiCorp Vault - Secrets management",
        "Splunk - Security information & event management"
    ],
    "Productivity & Collaboration": [
        "Slack - Team communication",
        "Notion - Workspace & notes",
        "Jira - Issue tracking",
        "Trello - Project management",
        "Figma - Interface design",
        "Miro - Online whiteboard",
        "Zoom - Video conferencing",
        "Discord - Community chat",
        "Obsidian - Knowledge base"
    ]
};

const websitesData = [
    { name: "GitHub", url: "https://github.com", desc: "Code hosting & collaboration" },
    { name: "Stack Overflow", url: "https://stackoverflow.com", desc: "Q&A for developers" },
    { name: "Dev.to", url: "https://dev.to", desc: "Developer community" },
    { name: "Hacker News", url: "https://news.ycombinator.com", desc: "Tech news aggregator" },
    { name: "Product Hunt", url: "https://producthunt.com", desc: "New tech products" },
    { name: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "Web documentation" },
    { name: "ArXiv", url: "https://arxiv.org", desc: "Research papers" },
    { name: "Medium", url: "https://medium.com", desc: "Articles & stories" },
    { name: "TechCrunch", url: "https://techcrunch.com", desc: "Startup & tech news" },
    { name: "Hugging Face", url: "https://huggingface.co", desc: "The AI community" }
];

const rolesData = [
    { "name": "Frontend Beginner", "url": "https://roadmap.sh/frontend?r=frontend-beginner" },
    { "name": "Backend Beginner", "url": "https://roadmap.sh/backend?r=backend-beginner" },
    { "name": "DevOps Beginner", "url": "https://roadmap.sh/devops?r=devops-beginner" },
    { "name": "Frontend", "url": "https://roadmap.sh/frontend" },
    { "name": "Backend", "url": "https://roadmap.sh/backend" },
    { "name": "Full Stack", "url": "https://roadmap.sh/full-stack" },
    { "name": "API Design", "url": "https://roadmap.sh/api-design" },
    { "name": "QA", "url": "https://roadmap.sh/qa" },
    { "name": "DevOps", "url": "https://roadmap.sh/devops" },
    { "name": "Android", "url": "https://roadmap.sh/android" },
    { "name": "iOS", "url": "https://roadmap.sh/ios" },
    { "name": "PostgreSQL", "url": "https://roadmap.sh/postgresql-dba" },
    { "name": "Software Architect", "url": "https://roadmap.sh/software-architect" },
    { "name": "Technical Writer", "url": "https://roadmap.sh/technical-writer" },
    { "name": "DevRel Engineer", "url": "https://roadmap.sh/devrel" },
    { "name": "Machine Learning", "url": "https://roadmap.sh/machine-learning" },
    { "name": "AI and Data Scientist", "url": "https://roadmap.sh/ai-data-scientist" },
    { "name": "AI Engineer", "url": "https://roadmap.sh/ai-engineer" },
    { "name": "AI Agents", "url": "https://roadmap.sh/ai-agents" },
    { "name": "Data Analyst", "url": "https://roadmap.sh/data-analyst" },
    { "name": "BI Analyst", "url": "https://roadmap.sh/bi-analyst" },
    { "name": "Data Engineer", "url": "https://roadmap.sh/data-engineer" },
    { "name": "MLOps", "url": "https://roadmap.sh/mlops" },
    { "name": "Product Manager", "url": "https://roadmap.sh/product-manager" },
    { "name": "Engineering Manager", "url": "https://roadmap.sh/engineering-manager" },
    { "name": "Client Side Game Dev.", "url": "https://roadmap.sh/game-developer" },
    { "name": "Server Side Game Dev.", "url": "https://roadmap.sh/server-side-game-developer" },
    { "name": "UX Design", "url": "https://roadmap.sh/ux-design" },
    { "name": "Blockchain", "url": "https://roadmap.sh/blockchain" },
    { "name": "Cyber Security", "url": "https://roadmap.sh/cyber-security" },
    { "name": "WordPress", "url": "https://roadmap.sh/wordpress" },
    { "name": "GraphQL", "url": "https://roadmap.sh/graphql" },
    { "name": "Git and GitHub", "url": "https://roadmap.sh/git-github" },
    { "name": "React", "url": "https://roadmap.sh/react" },
    { "name": "Vue", "url": "https://roadmap.sh/vue" },
    { "name": "Angular", "url": "https://roadmap.sh/angular" },
    { "name": "Next.js", "url": "https://roadmap.sh/nextjs" },
    { "name": "Spring Boot", "url": "https://roadmap.sh/spring-boot" },
    { "name": "ASP.NET Core", "url": "https://roadmap.sh/aspnet-core" },
    { "name": "Laravel", "url": "https://roadmap.sh/laravel" },
    { "name": "HTML", "url": "https://roadmap.sh/html" },
    { "name": "CSS", "url": "https://roadmap.sh/css" },
    { "name": "JavaScript", "url": "https://roadmap.sh/javascript" },
    { "name": "Kotlin", "url": "https://roadmap.sh/kotlin" },
    { "name": "Swift & Swift-UI", "url": "https://roadmap.sh/swift-ui" },
    { "name": "TypeScript", "url": "https://roadmap.sh/typescript" },
    { "name": "Node.js", "url": "https://roadmap.sh/nodejs" },
    { "name": "PHP", "url": "https://roadmap.sh/php" },
    { "name": "C++", "url": "https://roadmap.sh/cpp" },
    { "name": "Go", "url": "https://roadmap.sh/golang" },
    { "name": "Rust", "url": "https://roadmap.sh/rust" },
    { "name": "Python", "url": "https://roadmap.sh/python" },
    { "name": "Java", "url": "https://roadmap.sh/java" },
    { "name": "SQL", "url": "https://roadmap.sh/sql" },
    { "name": "Shell / Bash", "url": "https://roadmap.sh/shell-bash" },
    { "name": "Docker", "url": "https://roadmap.sh/docker" },
    { "name": "Kubernetes", "url": "https://roadmap.sh/kubernetes" },
    { "name": "AWS", "url": "https://roadmap.sh/aws" },
    { "name": "Cloudflare", "url": "https://roadmap.sh/cloudflare" },
    { "name": "Linux", "url": "https://roadmap.sh/linux" },
    { "name": "Terraform", "url": "https://roadmap.sh/terraform" },
    { "name": "React Native", "url": "https://roadmap.sh/react-native" },
    { "name": "Flutter", "url": "https://roadmap.sh/flutter" },
    { "name": "MongoDB", "url": "https://roadmap.sh/mongodb" },
    { "name": "Redis", "url": "https://roadmap.sh/redis" },
    { "name": "Elasticsearch", "url": "https://roadmap.sh/elasticsearch" },
    { "name": "Computer Science", "url": "https://roadmap.sh/computer-science" },
    { "name": "Data Structures", "url": "https://roadmap.sh/datastructures-and-algorithms" },
    { "name": "System Design", "url": "https://roadmap.sh/system-design" },
    { "name": "Design and Architecture", "url": "https://roadmap.sh/software-design-architecture" },
    { "name": "Code Review", "url": "https://roadmap.sh/code-review" },
    { "name": "AI Red Teaming", "url": "https://roadmap.sh/ai-red-teaming" },
    { "name": "Prompt Engineering", "url": "https://roadmap.sh/prompt-engineering" },
    { "name": "Design System", "url": "https://roadmap.sh/design-system" },
    { "name": "Backend Performance", "url": "https://roadmap.sh/backend-performance-best-practices" },
    { "name": "Frontend Performance", "url": "https://roadmap.sh/frontend-performance-best-practices" },
    { "name": "Code Review", "url": "https://roadmap.sh/code-review-best-practices" },
    { "name": "AWS", "url": "https://roadmap.sh/aws-review-best-practices" },
    { "name": "API Security", "url": "https://roadmap.sh/api-security-best-practices" }
];


let commandHistory = [];
let historyIndex = -1;

// === TYPING LOGIC ===

function typeText(element, text, speed = 20) {
    return new Promise(resolve => {
        let i = 0;
        isTyping = true;
        input.disabled = true;

        function type() {
            if (i < text.length) {
                if (text.charAt(i) === "<") {
                    const closeIdx = text.indexOf(">", i);
                    if (closeIdx !== -1) {
                        element.innerHTML += text.substring(i, closeIdx + 1);
                        i = closeIdx + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                const terminal = document.querySelector('.terminal');
                if (terminal) terminal.scrollTop = terminal.scrollHeight;
                setTimeout(type, speed);
            } else {
                isTyping = false;
                input.disabled = false;
                input.focus();
                resolve();
            }
        }
        type();
    });
}

async function printLine(text, typingSpeed = 0) {
    const line = document.createElement('div');
    output.appendChild(line);

    if (typingSpeed > 0) {
        await typeText(line, text, typingSpeed);
    } else {
        line.innerHTML = text;
        const terminal = document.querySelector('.terminal');
        if (terminal) terminal.scrollTop = terminal.scrollHeight;
    }
}

async function runBootSequence() {
    input.disabled = true;
    for (const msg of bootSequence) {
        await printLine(msg, 20); // Typing effect for boot
        await new Promise(r => setTimeout(r, 100));
    }
    await printLine("<br>");
    input.disabled = false;
    input.focus();
}

async function processCommand(cmd) {
    if (isTyping) return;

    const cleanCmd = cmd.trim().toLowerCase();

    // Echo the command
    const timestamp = new Date().toLocaleTimeString();
    await printLine(`<span style="color:var(--prompt-color)">[${timestamp}] visitor@tech-terminal:~$</span> ${cmd}`, 0);

    if (cleanCmd === "") return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    switch (cleanCmd) {
        case "help":
            await printLine("<br>Available commands:", 10);
            await printLine("  <span style='color:white'>tools</span>     - Show frequently used tech tools", 5);
            await printLine("  <span style='color:white'>websites</span>  - Show popular tech websites", 5);
            await printLine("  <span style='color:white'>roles</span>     - Show roadmap.sh tech roadmaps", 5);
            await printLine("  <span style='color:white'>clear</span>     - Clear the terminal screen", 0);
            await printLine("  <span style='color:white'>about</span>     - About this project", 5);
            await printLine("  <span style='color:white'>all</span>       - Show everything", 0);
            await printLine("<br>");
            break;

        case "tools":
            await printLine("<br>=== TECH INDUSTRY TOOLS ===<br>", 10);
            for (const [category, tools] of Object.entries(toolsData)) {
                await printLine(`<span class="category-header">[ ${category} ]</span>`, 10);
                for (const tool of tools) {
                    await printLine(`<span class="tool-item">> ${tool}</span>`, 0); // Instant type to preserve HTML structure
                }
                await printLine("<br>", 0);
            }
            break;

        case "websites":
            await printLine("<br>=== FREQUENTLY USED WEBSITES ===<br>", 10);
            for (const site of websitesData) {
                await printLine(`<span class="tool-item">> <a href="${site.url}" target="_blank">${site.name}</a> - ${site.desc}</span>`, 0);
            }
            await printLine("<br>", 0);
            break;

        case "roles":
            await printLine("<br>=== ROADMAP.SH TECH ROADMAPS ===<br>", 10);
            await printLine("Click to view official roadmap:<br>", 5);
            for (const role of rolesData) {
                // Direct external link to roadmap.sh
                const link = `<a href="${role.url}" target="_blank">${role.name}</a>`;
                await printLine(`<span class="tool-item">> ${link}</span>`, 0); // Instant type to preserve HTML structure
            }
            await printLine("<br>", 0);
            break;

        case "clear":
            output.innerHTML = "";
            break;

        case "about":
            await printLine("<br>This is a terminal-themed portfolio experiment.", 20);
            await printLine("Created to showcase tech industry tools and resources.", 20);
            await printLine("Type 'tools' or 'websites' to explore.", 20);
            printLine("<br>");
            break;

        case "all":
            await processCommand("tools");
            await processCommand("websites");
            await processCommand("roles");
            break;

        default:
            await printLine(`<span style="color:red">Command not found: ${cleanCmd}</span>. Type 'help' for available commands.<br>`, 10);
    }
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { // Normal enter key processing
        processCommand(input.value);
        input.value = "";
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = "";
        }
    }
});

// Start things up
runBootSequence();

// Always keep focus (unless user deliberately clicks away, but we'll try to bring it back)
document.addEventListener('click', (e) => {
    // Don't steal focus if clicking on a link
    if (e.target.tagName === 'A') return;

    const selection = window.getSelection();
    if (selection.toString().length === 0) {
        input.focus();
    }
});
