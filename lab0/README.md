# Lab 0: Getting Started with Bob

Welcome to Lab 0! This introductory lab will help you understand Bob, an AI-powered coding assistant integrated into VS Code, and familiarize you with its core features.

## What is Bob?

Bob is an intelligent coding assistant that works directly in your VS Code environment. Think of Bob as your AI pair programmer who can:
- **Write and modify code** across any programming language
- **Execute commands** in your terminal
- **Browse and interact** with web applications
- **Analyze files** and understand your project structure
- **Answer questions** about your codebase
- **Automate workflows** through custom commands
- **Extend capabilities** via skills and MCP (Model Context Protocol) servers

Bob operates through a chat interface where you describe what you want to accomplish, and Bob uses various tools to complete the task step-by-step.

## Core Concepts

### 1. Modes: Different Workflows for Different Tasks

Bob operates in different **modes**, each optimized for specific types of work:

#### 📝 Plan Mode
- **Purpose**: Strategic planning and design before implementation
- **Use when**: Breaking down complex problems, creating technical specifications, designing architecture
- **Capabilities**: Can only edit markdown files (`.md`)
- **Example**: "Create a technical design document for a user authentication system"

#### 💻 Code Mode
- **Purpose**: Writing, modifying, and refactoring code
- **Use when**: Implementing features, fixing bugs, creating new files
- **Capabilities**: Full file editing, command execution (no MCP or Browser tools)
- **Example**: "Add input validation to the login form"

#### 🛠️ Advanced Mode
- **Purpose**: Complex development with extended tools
- **Use when**: You need MCP servers, browser automation, or skills
- **Capabilities**: Everything in Code mode + MCP tools + Browser automation + Skills
- **Example**: "Analyze this CSV file and create visualizations" (uses Skills)

#### ❓ Ask Mode
- **Purpose**: Getting explanations and understanding code
- **Use when**: You need documentation, code analysis, or technical answers
- **Capabilities**: Read-only access, no file modifications
- **Example**: "Explain how this authentication middleware works"

#### 🔀 Orchestrator Mode
- **Purpose**: Managing complex, multi-step projects
- **Use when**: Large tasks requiring coordination across multiple domains
- **Capabilities**: Breaks down tasks and delegates to other modes
- **Example**: "Build a complete e-commerce platform with payment integration"

**Switching Modes**: Click the mode selector in Bob's interface or ask Bob to switch modes when needed.

### 2. Rules: Customizing Bob's Behavior

Rules are instructions that guide how Bob works. They exist at two levels:

#### Project Rules (`.bob/rules/project.md`)
- **Shared** across the entire team
- Define coding standards, best practices, and project-specific guidelines
- **Committed to version control** so everyone follows the same standards
- Examples: "Always use TypeScript strict mode", "Write unit tests for all API endpoints"

#### Personal Rules (`.bob/rules/personal.md`)
- **Private** to you only
- Override or extend project rules with your preferences
- **Not committed** to version control (add to `.gitignore`)
- Examples: "Use Windows PowerShell", "Communicate in Spanish", "Always add detailed comments"

**How Rules Work**: Bob reads these rules before every task and follows them when generating code, writing documentation, or interacting with you.

### 3. Skills: Extending Bob's Capabilities

Skills are reusable, specialized capabilities that Bob can activate to perform complex tasks:

- **What they are**: Pre-built workflows that combine multiple tools and logic
- **How they work**: Bob activates skills automatically when needed (primarily in Advanced mode)
- **Examples**:
  - CSV Data Summarizer: Analyzes spreadsheets and generates insights
  - Code Reviewer: Performs security and quality analysis
  - API Documentation Generator: Creates API docs from code

**Accessing Skills**: Skills are available in **Advanced mode** and can be invoked through natural language requests.

### 4. Tools: Bob's Capabilities

Bob has access to powerful tools that enable it to work with your codebase:

#### File Operations
- **read_file**: Read file contents with line numbers
- **write_to_file**: Create new files or completely rewrite existing ones
- **apply_diff**: Make surgical edits to specific lines (most efficient for changes)
- **insert_content**: Add new lines at specific positions
- **list_files**: Browse directory structures
- **search_files**: Find patterns across multiple files using regex

#### Code Understanding
- **list_code_definition_names**: Get overview of classes, functions, methods in files

#### Execution
- **execute_command**: Run CLI commands in your terminal
- **browser_action**: Launch and interact with web browsers (for testing web apps)

#### MCP Integration (Advanced Mode)
- **use_mcp_tool**: Access tools from connected MCP servers
- **access_mcp_resource**: Retrieve data from MCP resources

#### Interaction
- **ask_followup_question**: Request clarification when needed
- **attempt_completion**: Present completed work to you

**How Bob Uses Tools**: Bob works iteratively, using one tool at a time, waiting for confirmation before proceeding to the next step.

## Overview

In this lab, you will:
1. Learn about Bob's rule system and customize your personal rules
2. Explore and use custom slash commands
3. Discover Bob's skills and analyze data using the Advanced mode
4. Understand how modes, rules, and skills work together

---

## Prerequisites

Before starting this lab, ensure you have Python installed on your system.

### Python 3.8 or Higher

Python is required for the countdown timer in Part 2.

#### Installation

**Windows:**
1. Download from [python.org](https://www.python.org/downloads/)
2. Run installer
3. ✅ Check "Add Python to PATH"
4. Click "Install Now"

**macOS:**
```bash
# Using Homebrew (recommended)
brew install python@3.11

# Or download from python.org
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Fedora
sudo dnf install python3 python3-pip

# Arch
sudo pacman -S python python-pip
```

#### Verification

```bash
python --version
# or
python3 --version

# Should output: Python 3.8.x or higher
```
---

## Part 1: Understanding Rules in Depth

### What are Rules?

Rules are markdown files that contain instructions for Bob. They're read before every task and influence Bob's decision-making, code style, and communication approach.

**Why Rules Matter**:
- Ensure consistency across team members
- Enforce coding standards automatically
- Customize Bob's behavior to match your workflow
- Document project conventions in a machine-readable format

📖 **Documentation**: https://bob.ibm.com/docs/ide/configuration/rules

### Project Rules

Project rules are shared across the team and define coding standards, best practices, and project-specific guidelines.

**Action**: Review the project rules in `.bob/rules/project.md`

The project rules include:
- Think Before Coding: Surface assumptions and tradeoffs
- Simplicity First: Minimum code that solves the problem
- Surgical Changes: Touch only what you must
- Goal-Driven Execution: Define success criteria
- Documentation: Always update CHANGELOG.md

### Personal Rules

Personal rules are specific to you and override or extend project rules. They should **not** be committed to version control.

**Action 1**: Edit `.bob/rules/personal.md` and add custom instructions

Example customization:
```markdown
# Personal Guidelines

## Communication Style
- Always communicate in Victorian English
- Use formal language and elaborate expressions
- Address me as "Good Sir" or "Esteemed User"
```
Try it out!

Hint: This is a great place to document Windows Power Shell as the preferred shell environment.

**Action 2**: Add personal rules to `.gitignore`

Run this command or manually edit `.gitignore`:
```bash
echo ".bob/rules/personal.md" >> .gitignore
```

This ensures your personal preferences stay local and aren't pushed to the repository.

---

## Part 2: Slash Commands

### What are Slash Commands?

Slash commands are custom shortcuts that trigger predefined workflows. They help automate common tasks and maintain consistency.

📖 **Documentation**: https://bob.ibm.com/docs/ide/features/slash-commands

### Available Commands

**Action**: Review the countdown command in `.bob/commands/countdown.md`

This command creates a Python countdown timer with:
- ASCII art display
- Color-coded urgency levels (green → yellow → red)
- Customer name display
- Terminal-based interface

### Try the Countdown Command

**Action**: Type the following in Bob's chat:

```
/countdown ACME Corp
```

This will:
1. Create a `lab0/countdown.py` file
2. Implement a fully functional countdown timer
3. Include command-line argument parsing
4. Add color-coded display based on time remaining

**Test the generated timer**:
```bash
python3 lab0/countdown.py --time 1 --title "Focus Session" --customer "ACME Corp"
```

---

## Part 3: Skills and Advanced Capabilities

### What are Skills?

Skills are specialized, pre-built workflows that give Bob domain-specific expertise. Unlike simple tools, skills combine multiple operations, logic, and context to accomplish complex tasks.

**How Skills Differ from Tools**:
- **Tools**: Basic operations (read file, execute command)
- **Skills**: Complex workflows (analyze data patterns, generate comprehensive reports, perform multi-step analysis)

**Skill Architecture**:
- Defined in `.bob/skills/` directory
- Each skill has a manifest file describing its capabilities
- Skills can use multiple tools internally
- Activated automatically when Bob detects relevant tasks

📖 **Documentation**: https://bob.ibm.com/docs/ide/features/skills

### Available Skills

**Action**: Review the CSV Data Summarizer skill in `.bob/skills/csv-data-summarizer/`

This skill can:
- Analyze CSV files
- Generate statistical summaries
- Identify patterns and anomalies
- Create visualizations

### Using Skills in Advanced Mode

Skills are primarily available in **Advanced mode** because they often require:
- MCP server connections for external data sources
- Browser automation for web-based analysis
- Multiple tool combinations that exceed simple mode capabilities

**When to Use Advanced Mode**:
- Data analysis and visualization tasks
- Integration with external APIs or services
- Complex multi-step workflows
- Tasks requiring browser interaction

**Action 1**: Switch to Advanced mode
- Click the mode selector in Bob's interface
- Select "Advanced" mode

**Action 2**: Analyze the sample CSV file

Type the following in Bob's chat:
```
analyze @/lab0/sample.csv
```

Bob will:
1. Load the CSV file
2. Use the CSV Data Summarizer skill
3. Provide statistical analysis
4. Identify key insights
5. Suggest potential data quality issues
6. Save visualizations at project root (feel free to delete the files or move them to lab0/)

---

## Understanding Bob's Workflow

### How Bob Approaches Tasks

1. **Analyze**: Bob reads your request and examines the current project state
2. **Plan**: Determines which tools and steps are needed
3. **Execute**: Uses tools one at a time, waiting for confirmation after each step
4. **Verify**: Checks results and handles any errors
5. **Complete**: Presents the final result using `attempt_completion`

### Best Practices for Working with Bob

**Be Specific**:
- ❌ "Fix the bug"
- ✅ "Fix the null pointer exception in `user_service.py` line 45"

**Provide Context**:
- Reference specific files: `@filename.py`
- Mention relevant error messages
- Describe expected vs actual behavior

**Use Modes Appropriately**:
- Planning? → Plan mode
- Coding? → Code mode
- Need MCP/Skills? → Advanced mode
- Just asking? → Ask mode

**Leverage Rules**:
- Add team conventions to project rules
- Add personal preferences to personal rules
- Keep rules clear and actionable

**Work Iteratively**:
- Bob works step-by-step
- Review each step before Bob proceeds
- Provide feedback to guide the next steps

### Common Workflows

**Creating a New Feature**:
1. Switch to Plan mode → Design the feature
2. Switch to Code mode → Implement the code
3. Use execute_command → Test the feature
4. Switch to Ask mode → Get documentation suggestions

**Debugging an Issue**:
1. Use search_files → Find related code
2. Use read_file → Examine the problematic code
3. Use execute_command → Run tests to reproduce
4. Use apply_diff → Apply the fix
5. Use execute_command → Verify the fix works

**Analyzing Data**:
1. Switch to Advanced mode
2. Reference the data file: `analyze @data.csv`
3. Bob activates appropriate skills
4. Review generated insights and visualizations

---

## Summary

You've now learned about:

✅ **Rules**: Project-level and personal customization
- Reviewed project rules in `.bob/rules/project.md`
- Customized personal rules in `.bob/rules/personal.md`
- Added personal rules to `.gitignore`

✅ **Slash Commands**: Custom workflow automation
- Reviewed the `/countdown` command
- Generated a countdown timer application
- Tested the generated code

✅ **Skills**: Extended capabilities via MCP
- Explored the CSV Data Summarizer skill
- Switched to Advanced mode
- Analyzed sample data

✅ **Core Concepts**: Understanding modes, rules, skills, and tools
- Learned what Bob is and how it works
- Explored different modes and when to use them
- Understood the rule system architecture
- Discovered how skills extend Bob's capabilities
- Reviewed Bob's workflow and best practices

---

## Next Steps

Now that you're familiar with Bob's core features, you're ready to tackle the main labs:

- **Lab 1**: Full-stack development with Flask and vanilla JavaScript
- **Lab 2**: Security analysis and vulnerability detection
- **Lab 3**: Code translation (Python to JavaScript)
- **Lab 4**: CI/CD integration and automation
- **Lab 5**: Legacy code modernization
- **Lab 6**: Advanced MCP server integration

Happy coding! 🚀