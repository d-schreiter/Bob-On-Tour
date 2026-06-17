# Lab 4: Creating MCP Servers and Custom Modes

## Overview

In this advanced lab, you'll learn how to extend Bob's capabilities by creating custom Model Context Protocol (MCP) servers and custom modes. This allows you to integrate Bob with your organization's tools, APIs, and workflows, making Bob even more powerful and tailored to your specific needs.

> **🔧 Bob Differentiator: [Extensible Architecture](../bob-differentiators.md#1--extensible-architecture)**
> This lab showcases Bob's most powerful differentiator—its extensible architecture. Through customizable modes and MCP server integrations, Bob adapts to YOUR environment and workflows. Unlike other AI assistants that work in isolation, Bob can connect to internal APIs, databases, documentation systems, and custom tools. This extensibility makes Bob uniquely valuable for enterprise teams with specific needs and existing toolchains.

**Duration:** 75-90 minutes
**Difficulty:** Advanced
**Prerequisites:** Completion of Labs 1-3, understanding of REST APIs, Node.js or Python experience

## Learning Objectives

By the end of this lab, you will be able to:

1. Understand the Model Context Protocol (MCP) architecture
2. Create a custom MCP server from scratch
3. Implement MCP server endpoints and tools
4. Integrate external APIs and services with Bob
5. Create custom Bob modes for specific workflows
6. Deploy and configure MCP servers
7. Test and debug MCP integrations
8. Share custom modes with your team

## What is MCP?

**Model Context Protocol (MCP)** is an open protocol that enables AI assistants like Bob to:
- Access external data sources
- Execute custom tools and functions
- Integrate with third-party services
- Extend capabilities beyond built-in features

> **🎯 Why MCP Matters**
> MCP is a key part of Bob's [extensible architecture](../bob-differentiators.md#mcp-server-integration). It allows Bob to integrate with your company's internal tools, APIs, and services. This means Bob can access your documentation, query your databases, create tickets in your issue tracker, and deploy to your infrastructure—all through natural language. Bob adapts to YOUR environment, not the other way around.

**Key Concepts:**
- **MCP Server**: A service that exposes tools and resources to Bob
- **Tools**: Functions that Bob can call to perform actions
- **Resources**: Data sources that Bob can query
- **Prompts**: Pre-defined prompt templates
- **Custom Mode**: A specialized Bob configuration for specific tasks

## Lab Structure

```
lab4/
├── README.md                           # This file
├── mcp-server/                         # MCP server implementation
│   ├── package.json                    # Node.js dependencies
│   ├── server.js                       # Main server implementation
│   ├── tools/                          # Tool implementations
│   │   └── database-tools.js           # Database queries
│   ├── resources/                      # Resource providers
│   │   ├── documentation.js            # Doc access
│   │   └── metrics.js                  # System metrics
│   └── config/                         # Configuration
│       ├── server-config.json          # Server settings
│       └── tools-config.json           # Tool definitions
├── custom-mode/                        # Custom mode definitions
│   └── database-mode.json              # Database operations mode
├── examples/                           # Usage examples
│   └── database-queries.md             # Database examples
```

## Part 1: Understanding MCP Architecture (Read Only - No Actions Required)

> **📖 This section is informational only. No actions are required yet.**

### Step 1.1: MCP Protocol Basics

MCP uses a client-server architecture:

```
┌─────────────┐         MCP Protocol       ┌─────────────┐
│             │◄──────────────────────────►│             │
│  Bob Client │    JSON-RPC over stdio     │ MCP Server  │
│             │    or HTTP/WebSocket       │             │
└─────────────┘                            └─────────────┘
       │                                          │
       │                                          │
       ▼                                          ▼
  User Requests                            External Services
  - Ask questions                          - Database
  - Execute tasks                          - Custom APIs
  - Get information
```

**Key Components:**

1. **Tools**: Functions Bob can call
   ```json
   {
     "name": "query_database",
     "description": "Execute a database query",
     "parameters": {
       "query": "string",
       "database": "string"
     }
   }
   ```

2. **Resources**: Data Bob can access
   ```json
   {
     "uri": "docs://api-reference",
     "name": "API Documentation",
     "mimeType": "text/markdown"
   }
   ```

3. **Prompts**: Pre-defined templates
   ```json
   {
     "name": "code_review",
     "description": "Perform code review",
     "template": "Review this code for: {criteria}"
   }
   ```

### Step 1.2: MCP Server Lifecycle

```
1. Initialize → 2. Register Tools → 3. Handle Requests → 4. Cleanup
     │                  │                    │               │
     │                  │                    │               │
     ▼                  ▼                    ▼               ▼
  Setup            Define tools        Execute tools    Close connections
  connections      and resources       return results   cleanup resources
```

## Part 2: Creating Your First MCP Server

> **✅ ACTION REQUIRED: Complete Steps 2.1-2.4**

### Step 2.1: Initialize MCP Server Project

**🔨 ACTION: Set up the MCP server**

The MCP server files are already provided in `lab4/mcp-server/`. Install dependencies:

```bash
cd lab4/mcp-server
npm install
```

This will install:
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `express` - Web server framework
- `axios` - HTTP client
- `dotenv` - Environment variable management
- `winston` - Logging

> **💡 OPTIONAL: Using Bob UI for Setup**
>
> If you prefer, you can use Bob to help with setup:
> 1. Open Bob in VS Code
> 2. Switch to **Advanced mode** (required for MCP server configuration)
> 3. Ask Bob: "Help me set up an MCP server project in lab4/mcp-server"
> 4. Bob will guide you through the setup process

### Step 2.2: Examine the MCP Server Implementation

**📖 REVIEW: Understand the server structure**

Open and examine the main server file:

**File: `mcp-server/server.js`**

This file implements a basic MCP server with tool registration and request handling. The server:
- Initializes the MCP protocol
- Registers available tools
- Handles tool execution requests
- Manages resources and prompts
- Provides error handling and logging

Key features:
- **Tool Registration**: Defines what Bob can do
- **Request Handling**: Processes Bob's requests
- **Resource Management**: Provides access to data
- **Error Handling**: Graceful failure management

### Step 2.3: Review Tool Implementations

**📖 REVIEW: Examine the tool files**

Tools are the core functionality of your MCP server. The following tools are already implemented:

**File: `mcp-server/tools/database-tools.js`**

This file implements three simple database tools:
- `query_database`: Execute read-only database queries
- `get_table_schema`: Get table schema information
- `list_tables`: List all tables in the database

Each tool:
- Validates input parameters
- Executes database operations safely
- Handles errors
- Returns structured results

### Step 2.4: Review Resource Implementations

**📖 REVIEW: Examine the resource files**

Resources provide Bob with access to data. The following resources are already implemented:

**File: `mcp-server/resources/documentation.js`**

This file provides access to documentation:
- API documentation
- Architecture documentation

Resources can be:
- Static files
- Dynamic queries
- External API calls
- Database queries

## Part 3: Advanced Tool Implementation (Read Only - No Actions Required)

> **📖 This section explains the advanced tools already implemented. No actions required.**

### Step 3.1: Database Query Tool

**📖 REVIEW: Understanding database tools**

The database tool is already implemented in:

**File: `mcp-server/tools/database-tools.js`**

Features already included:
- List all available tables
- Get table schemas
- Execute read-only queries

**Security Considerations:**
- Read-only access
- Query validation
- SQL injection prevention
- Rate limiting
- Audit logging

### Step 3.2: Custom Business Logic (Optional Extension)

**💡 OPTIONAL: This is an example for extending the server**

You can implement organization-specific tools like this:

```javascript
// Example: Customer lookup tool
async function lookupCustomer(customerId) {
  // Validate input
  if (!customerId) {
    throw new Error('Customer ID required');
  }
  
  // Call internal API
  const response = await fetch(`${API_BASE}/customers/${customerId}`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  
  // Return structured data
  return {
    customer: await response.json(),
    metadata: {
      timestamp: new Date().toISOString(),
      source: 'internal-api'
    }
  };
}
```

## Part 4: Creating Custom Modes (Read Only - No Actions Required)

> **📖 This section explains custom modes. The mode files are already provided.**

### Step 4.1: Understanding Custom Modes

> **🎯 Bob Differentiator: [Customizable Modes](../bob-differentiators.md#customizable-modes)**
> Custom modes are another key differentiator for Bob. You can create specialized modes for database operations, code review, documentation, architecture design, or any team-specific process. These modes can be shared through the marketplace, ensuring consistent behavior across your team. This level of customization is unique to Bob.

Custom modes configure Bob for specific workflows:

```json
{
  "name": "Database Mode",
  "description": "Specialized mode for database operations",
  "capabilities": [
    "database-queries",
    "schema-management"
  ],
  "tools": [
    "query_database",
    "get_table_schema",
    "list_tables"
  ],
  "prompts": [
    "query_optimization",
    "schema_design"
  ]
}
```

### Step 4.2: Database Mode

**File: `custom-mode/database-mode.json`**

This mode is optimized for database operations:

**Features:**
- Database queries
- Schema management
- Query optimization
- Data analysis
- Migration planning

**Tools Available:**
- `query_database`: Execute read-only SQL queries
- `get_table_schema`: Get table schema information
- `list_tables`: List all tables in the database

**Prompts:**
- Query optimization
- Schema design
- Data analysis
- Migration planning

**Shortcuts:**
- List all tables
- Get table schema
- Query database

## Part 5: Testing Your MCP Server

> **✅ ACTION REQUIRED: Complete Steps 5.1-5.3 to test your MCP server**

### Step 5.1: Configure MCP Server in Bob

**🔨 ACTION: Configure the MCP server in Bob**

Follow these steps to connect your MCP server to Bob:

1. Open Bob Settings (gear icon)
2. Navigate to **MCP** section
3. Choose configuration scope:
   - **Global MCPs** - Available across all projects
   - **Project MCPs** - Only available in current project
4. Click to edit the JSON configuration file
5. Add your server configuration:
   ```json
   {
     "mcpServers": {
       "lab4-database-mcp": {
         "command": "node",
         "args": ["server.js"],
         "cwd": "modify/this/to/your/absolute/path/to/lab4/mcp-server"
       }
     }
   }
   ```
6. Save the file
7. Restart Bob or reload VS Code (`Cmd+Shift+P → Reload Window`)
> **⚠️ Important:** Do not forget to change the path under the `cwd` that links to the directory of the mcp-server `server.js` !

> **⚠️ Important:** While you can configure MCP servers in any mode, MCP tools can only be used when Bob is in **Advanced mode**. Make sure to switch to Advanced mode before testing your MCP server tools.

### Step 5.2: Start and Test Your Server

**🔨 ACTION: Start the server and test it with Bob**
1. **Get Credentials for the PostgreSQL database:**
  - Ask your instructor for the database credentials.
  Use the following commands and fill out the placeholders with the credentials you receive:
  ```bash
  cd lab4/mcp-server
  cp .env.example .env
  ```
2. **Test connection to the database:**
   ```bash
   node test-connection.js
   ```
3. **Start the MCP server:**
   ```bash
   node server.js
   ```
4. **Switch Bob to Advanced mode** (required to use MCP tools)

5. Test your MCP server tools by asking Bob:
   - "What MCP servers are connected?"
   - "Show me the 6 cheapest products in ascending order"
   - "Get the schema for the users table"
   - "Query the database for active users"

Bob will automatically use the appropriate tools from your MCP server when in Advanced mode.


## Part 6: Best Practices (Read Only - Reference Material)

> **📖 This section provides best practices for reference. No actions required.**

### 6.1: Security Best Practices

1. **Authentication & Authorization**
   - Use API tokens, not passwords
   - Implement role-based access control
   - Validate all inputs
   - Use HTTPS for all communications

2. **Data Protection**
   - Encrypt sensitive data
   - Don't log secrets
   - Implement rate limiting
   - Use secure credential storage

3. **Audit & Monitoring**
   - Log all tool executions
   - Monitor for suspicious activity
   - Set up alerts
   - Regular security reviews

### 6.2: Performance Best Practices

1. **Caching**
   - Cache frequently accessed data
   - Implement cache invalidation
   - Use appropriate TTLs

2. **Async Operations**
   - Use async/await for I/O
   - Implement timeouts
   - Handle concurrent requests

3. **Resource Management**
   - Connection pooling
   - Proper cleanup
   - Memory management

### 6.3: Reliability Best Practices

1. **Error Handling**
   - Graceful degradation
   - Meaningful error messages
   - Retry logic with backoff
   - Circuit breakers

2. **Monitoring**
   - Health checks
   - Metrics collection
   - Logging
   - Alerting

3. **Testing**
   - Unit tests
   - Integration tests
   - Load testing
   - Security testing

## Part 7: Advanced Topics (Read Only - Reference Material)

> **📖 This section covers advanced topics for reference. No actions required.**

### 7.1: Multi-Server Architecture

**💡 REFERENCE: How to configure multiple MCP servers**

1. Open Bob Settings (gear icon) → MCP
2. Edit the Global or Project MCP configuration JSON
3. Add multiple servers:
   ```json
   {
     "mcpServers": {
       "db-server": {
         "command": "node",
         "args": ["db-server.js"],
         "cwd": "/path/to/db-server"
       }
     }
   }
   ```
4. Save and restart Bob

When you ask Bob (in Advanced mode) to perform database operations, it will intelligently use the appropriate tools.

### 7.2: Custom Protocol Extensions

Extend MCP with custom capabilities:

```javascript
// Custom protocol extension
class CustomMCPServer extends MCPServer {
  async handleCustomRequest(request) {
    // Custom logic
    return {
      result: 'custom response'
    };
  }
}
```

## Exercises (Optional Extensions)

> **💡 OPTIONAL: These are suggested exercises to extend your learning**

### Exercise 1: Create a GitHub Integration

**💡 OPTIONAL EXERCISE**

Create an MCP server that integrates with GitHub:
- Create issues
- Manage pull requests
- Get repository information
- Post comments

### Exercise 2: Build a Monitoring Dashboard

Create tools for system monitoring:
- Get system metrics
- View application logs
- Check service health
- Generate reports

### Exercise 3: Implement Notification Integration

Create notification tools:
- Send alerts
- Post to Slack/Teams
- Email notifications
- SMS alerts

## Part 8: Managing Custom Modes and MCP Servers (Optional)

> **💡 OPTIONAL: Learn how to manage modes and servers**

### Step 8.1: Installing Custom Modes

**💡 OPTIONAL: How to install custom modes**

1. Open Bob Settings
2. Navigate to **Custom Modes**
3. Click **Import Mode**
4. Select your mode file (e.g., `database-mode.json`)
5. The mode appears in Bob's mode selector

### Step 8.2: Removing Custom Modes

**To remove a custom mode:**

1. Open Bob Settings
2. Navigate to **Custom Modes**
3. Find the mode you want to remove
4. Click the **trash/delete icon** next to the mode
5. Confirm deletion

**Alternative - Manual removal:**
- Custom modes are stored in: `~/.bob/modes/`
- Delete the JSON file for the mode you want to remove
- Restart VS Code

### Step 8.3: Removing MCP Servers

**To remove an MCP server:**

1. Open Bob Settings (gear icon)
2. Navigate to **MCP** section
3. Choose **Global MCPs** or **Project MCPs**
4. Edit the JSON configuration file
5. Remove the server entry from the `mcpServers` object
6. Save the file
7. Restart Bob or reload VS Code

**Configuration file locations:**
- Global MCPs: `~/.bob/mcp.json`
- Project MCPs: `.bob/mcp.json` in your project root

**Example - Removing a server:**
```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["server.js"],
      "cwd": "/path/to/server"
    },
    "server-to-remove": {  // Delete this entire block
      "command": "node",
      "args": ["other-server.js"],
      "cwd": "/path/to/other"
    }
  }
}
```

After removal:
```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["server.js"],
      "cwd": "/path/to/server"
    }
  }
}
```

> **💡 Tip:** Keep a backup of your MCP configuration before making changes, so you can easily restore servers if needed.

## Troubleshooting

### Common Issues

1. **Server Won't Start**
   - Check server logs in terminal
   - Verify dependencies: `npm install` in server directory
   - Check configuration files in `config/`
   - Ensure ports aren't already in use

2. **Tools Not Available in Bob**
   - **Most Common:** Verify you're in **Advanced mode** - MCP tools only work in Advanced mode
   - Check MCP server is configured in Bob Settings → MCP (Global or Project)
   - Verify the server is running: `ps aux | grep node`
   - Check server logs for errors in the terminal
   - Restart the MCP server and reload VS Code
   - Verify the `cwd` path in your MCP configuration is correct

3. **Authentication Failures**
   - Check environment variables are set
   - Verify API tokens haven't expired
   - Test API directly with curl
   - Check server logs for auth errors

4. **Custom Mode Not Working**
   - Verify mode file is valid JSON
   - Check mode is enabled in Bob Settings
   - Restart VS Code after importing
   - Review mode configuration for errors

## Summary

In this lab, you learned:

✅ Understanding MCP architecture and protocol</br>
✅ Creating custom MCP servers from scratch</br>
✅ Implementing tools for external integrations</br>
✅ Creating custom Bob modes for specific workflows</br>
✅ Security and performance best practices</br>
✅ Advanced topics and extensions</br>

> **🎯 Extensibility: Bob's Superpower**</br>
> You've now experienced Bob's [extensible architecture](../bob-differentiators.md#1--extensible-architecture) firsthand. By creating MCP servers and custom modes, you can tailor Bob to your organization's unique needs. This extensibility—combined with Bob's other differentiators like [intelligent resource optimization](../bob-differentiators.md#2--intelligent-resource-optimization), [Bob Findings](../bob-differentiators.md#3--bob-findings-automated-analysis-engine), and [Java modernization](../bob-differentiators.md#4--enterprise-java-modernization)—makes Bob a uniquely powerful tool for enterprise development teams.

## Next Steps

- Deploy your MCP server to production
- Create organization-specific tools
- Share custom modes with your team
- Contribute to the MCP ecosystem
- Explore advanced MCP features

## Additional Resources

- [MCP Protocol Specification](https://modelcontextprotocol.io/docs)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [Bob MCP Integration Guide](https://ibm.com/bob/docs/mcp)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Community MCP Servers](https://github.com/topics/mcp-server)

---

**Need Help?** If you encounter issues:
1. Check the troubleshooting section
2. Review the MCP documentation
3. Test with the example servers
4. Ask in the Bob community forums

**Feedback:** Help us improve this lab by sharing your experience and suggestions!

**Congratulations!** You've completed all 4 labs of the Bob Bootcamp. You now have comprehensive knowledge of Bob's capabilities and how to leverage them in your development workflow.