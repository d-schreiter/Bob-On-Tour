# Prerequisites & Setup Guide

This guide will help you set up your development environment for the Bob Bootcamp labs.

## Table of Contents
- [System Requirements](#system-requirements)
- [Required Software](#required-software)
- [Account Setup](#account-setup)
- [Verification Steps](#verification-steps)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Operating Systems
- **Windows**: Windows 10 or later
- **macOS**: macOS 10.15 (Catalina) or later
- **Linux**: Ubuntu 20.04+, Fedora 33+, or equivalent

### Hardware
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 2GB free space
- **Internet**: Stable internet connection required

## Required Software

### 1. Python 3.8 or Higher

Python is required for the Flask backend in Labs 1 and 2.

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

#### Install pip (if not included)
```bash
# Windows/macOS
python -m ensurepip --upgrade

# Linux
sudo apt install python3-pip  # Ubuntu/Debian
```

### 2. Node.js 14 or Higher

Node.js is required for JavaScript development and Lab 3.

#### Installation

**Windows/macOS:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Choose LTS version (recommended)
3. Run installer with default settings

**Linux:**
```bash
# Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Or using nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
```

#### Verification
```bash
node --version
# Should output: v14.x.x or higher

npm --version
# Should output: 6.x.x or higher
```

### 3. Git 2.x or Higher

Git is required for version control in Lab 1.

#### Installation

**Windows:**
1. Download from [git-scm.com](https://git-scm.com/)
2. Run installer
3. Use recommended settings
4. Choose your preferred editor

**macOS:**
```bash
# Using Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install git

# Fedora
sudo dnf install git

# Arch
sudo pacman -S git
```

#### Verification
```bash
git --version
# Should output: git version 2.x.x or higher
```

#### Git Configuration
```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### 4. Bob

Bob is the AI-powered development assistant used throughout all labs.

#### Installation

Follow the official Bob installation guide for your platform:
- [Bob Installation Documentation](https://pages.github.ibm.com/code-assistant/bob-docs/) (internal)
- [Bob Installation Documentation](https://ibm.biz/bob-doc) 

#### Verification
```bash
# Check Bob is installed and accessible
bob --version

# Or check in your IDE/editor
# Bob should appear in your extensions/plugins
```

### 5. Docker (Colima)
Docker is needed to be able to install MCP Servers within Bob.

#### Installation
```bash
# First execute this line to install docker and colima
brew install colima docker docker-compose docker-buildx

# Now link the docker-compose and docker-buildx commands to the docker CLI
mkdir -p ~/.docker/cli-plugins
ln -sfn $(brew --prefix)/opt/docker-compose/bin/docker-compose ~/.docker/cli-plugins/docker-compose
ln -sfn $(brew --prefix)/opt/docker-buildx/bin/docker-buildx ~/.docker/cli-plugins/docker-buildx

# Finally, start colima
colima start
```

#### Verification
```bash
# Check Docker is running
docker --version
docker info
```

#### Configuration

1. **Sign in to Bob**
   - Open Bob interface
   - Sign in with your credentials
   - Verify connection

2. **Configure Settings**
   - Set preferred mode (Architect/Code/Ask)
   - Configure auto-approvals (optional)
   - Set up workspace preferences

3. **Test Bob**
   - Open Bob chat
   - Try a simple query: "Hello, can you help me?"
   - Verify Bob responds

### 5. Text Editor or IDE

A code editor is required for viewing and editing files.

#### Recommended: Visual Studio Code

**Why VS Code?**
- Excellent Bob integration
- Built-in terminal
- Git integration
- Python and JavaScript support
- Free and open source

**Installation:**
1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install with default settings
3. Install recommended extensions:
   - Python (Microsoft)
   - JavaScript (ES6) code snippets
   - GitLens
   - Bob extension (if available)

**Alternative Editors:**
- PyCharm (Python-focused)
- WebStorm (JavaScript-focused)
- Sublime Text
- Atom
- Vim/Neovim (advanced users)

## Account Setup

### 1. GitHub Account

Required for Lab 1 (GitHub MCP integration).

#### Create Account
1. Go to [github.com](https://github.com/)
2. Click "Sign up"
3. Follow registration process
4. Verify your email

#### Configure SSH (Optional but Recommended)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to your clipboard
cat ~/.ssh/id_ed25519.pub | pbcopy

# Add to GitHub:
# 1. Go to GitHub Settings > SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste your public key
# 4. Save
```

#### Verify SSH Connection
```bash
ssh -T git@github.com
# Should output: Hi username! You've successfully authenticated...
```

### 2. Bob Account

Ensure your Bob account is properly configured.

#### Setup Steps
1. **Create Account** (if needed)
   - Visit Bob registration page
   - Complete sign-up process
   - Verify email

2. **Configure Profile**
   - Set display name
   - Configure preferences
   - Set up workspace

3. **Connect Services**
   - Link GitHub account (for MCP)
   - Configure integrations
   - Test connections

### 3. GitHub MCP Server (Optional)

The GitHub MCP server enables Bob to interact with GitHub directly.

#### Setup
1. **Enable MCP in Bob**
   - Open Bob settings
   - Navigate to MCP servers
   - Search for GitHub MCP Server
   - Click `Install` and select `Global` scope

2. **GitHub Token**
   - Navigate to https://github.com/settings/tokens
   - Click "Generate new token" and select Classic Token
   - Set Expiration to 7 Days
   - Select scopes: repo, user
   - Click "Generate Token" and copy it

3. **Finalize and Test Connection**
   - Go back to IBM Bob settings
   - Paste the token in GitHub Personal Access Token Field
   - Type "https://github.com" GitHub Hostname (optional) Field
   - Click "Install"
   - Now activate "Advanced" mode for Bob
   - Ask Bob: "List my GitHub repositories"
   - Verify Bob can access your repos

## Verification Steps

Run these commands to verify your setup:

### Complete Verification Script

**Windows (PowerShell):**
```powershell
Write-Host "=== Bob Bootcamp Setup Verification ===" -ForegroundColor Green

Write-Host "`nPython:" -ForegroundColor Yellow
python --version

Write-Host "`nNode.js:" -ForegroundColor Yellow
node --version

Write-Host "`nNPM:" -ForegroundColor Yellow
npm --version

Write-Host "`nGit:" -ForegroundColor Yellow
git --version

Write-Host "`nGit Config:" -ForegroundColor Yellow
git config user.name
git config user.email

Write-Host "`n=== Verification Complete ===" -ForegroundColor Green
```

**macOS/Linux (Bash):**
```bash
#!/bin/bash
echo "=== Bob Bootcamp Setup Verification ==="

echo -e "\nPython:"
python3 --version

echo -e "\nNode.js:"
node --version

echo -e "\nNPM:"
npm --version

echo -e "\nGit:"
git --version

echo -e "\nGit Config:"
git config user.name
git config user.email

echo -e "\n=== Verification Complete ==="
```

### Expected Output

All commands should return version numbers:
- ✅ Python 3.8.x or higher
- ✅ Node.js 14.x.x or higher
- ✅ NPM 6.x.x or higher
- ✅ Git 2.x.x or higher
- ✅ Git user.name and user.email configured

## Troubleshooting

### Python Issues

**Problem**: `python: command not found`
```bash
# Try python3 instead
python3 --version

# Or add Python to PATH (Windows)
# Add Python installation directory to System Environment Variables
```

**Problem**: `pip: command not found`
```bash
# Use python -m pip instead
python -m pip --version

# Or install pip
python -m ensurepip --upgrade
```

**Problem**: Permission denied when installing packages
```bash
# Use virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Or use --user flag (not recommended)
pip install --user package-name
```

### Node.js Issues

**Problem**: `node: command not found`
```bash
# Verify installation path
which node  # macOS/Linux
where node  # Windows

# Reinstall Node.js or add to PATH
```

**Problem**: `npm: command not found`
```bash
# npm should come with Node.js
# Reinstall Node.js from nodejs.org
```

**Problem**: Permission errors with npm
```bash
# Use nvm (Node Version Manager) instead
# Or fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Git Issues

**Problem**: `git: command not found`
```bash
# Verify installation
which git  # macOS/Linux
where git  # Windows

# Reinstall Git or add to PATH
```

**Problem**: Git credentials not saved
```bash
# Configure credential helper
git config --global credential.helper store  # Linux
git config --global credential.helper osxkeychain  # macOS
git config --global credential.helper manager  # Windows
```

**Problem**: SSH connection to GitHub fails
```bash
# Test connection
ssh -T git@github.com

# If fails, check:
# 1. SSH key is generated
# 2. SSH key is added to ssh-agent
# 3. Public key is added to GitHub
# 4. SSH service is running
```

### Bob Issues

**Problem**: Bob not responding
- Check internet connection
- Verify Bob service is running
- Restart Bob application
- Check Bob status page

**Problem**: MCP server not connecting
- Verify MCP is enabled in settings
- Re-authenticate with GitHub
- Check permissions granted
- Restart Bob

**Problem**: Auto-approvals not working
- Check auto-approval settings
- Verify feature is enabled
- Review approval rules
- Contact Bob support

## Additional Resources

### Documentation
- [Python Documentation](https://docs.python.org/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Git Documentation](https://git-scm.com/doc)
- [Bob Documentation](https://pages.github.ibm.com/code-assistant/bob-docs/) (internal)
- [Bob Documentation](https://ibm.biz/bob-doc) 

### Learning Resources
- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [JavaScript Tutorial](https://javascript.info/)
- [Git Tutorial](https://git-scm.com/book/en/v2)
- [Flask Documentation](https://flask.palletsprojects.com/)

### Community Support
- Bob Community Forum
- Stack Overflow
- GitHub Discussions
- Discord/Slack channels

## Next Steps

Once you've completed all setup steps:

1. ✅ Verify all software is installed
2. ✅ Configure Git with your information
3. ✅ Test Bob connection
4. ✅ Set up GitHub account and MCP
5. ✅ Create a test project to verify everything works

**Ready to start?** → [Return to Main README](README.md) → [Start Lab 1](lab1/README.md)

---

*Last Updated: December 2025*  
*Version: 1.0*