# Lab 0: Getting Started with Bob

Welcome to Lab 0! This introductory lab will familiarize you with Bob's core features: **Rules**, **Slash Commands**, and **Skills**.

## Overview

In this lab, you will:
1. Learn about Bob's rule system and customize your personal rules
2. Explore and use custom slash commands
3. Discover Bob's skills and analyze data using the Advanced mode

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

## Part 1: Understanding Bob Rules

### What are Rules?

Rules allow you to customize Bob's behavior at both project and personal levels. They guide how Bob approaches tasks, writes code, and interacts with you.

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

## Part 3: Skills

### What are Skills?

Skills are reusable capabilities that extend Bob's functionality. They can analyze data, generate reports, integrate with external tools, and more.

📖 **Documentation**: https://bob.ibm.com/docs/ide/features/skills

### Available Skills

**Action**: Review the CSV Data Summarizer skill in `.bob/skills/csv-data-summarizer/`

This skill can:
- Analyze CSV files
- Generate statistical summaries
- Identify patterns and anomalies
- Create visualizations

### Using Skills in Advanced Mode

Skills are available in Bob's **Advanced mode**, which provides access to Model Context Protocol (MCP) servers and extended capabilities.

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