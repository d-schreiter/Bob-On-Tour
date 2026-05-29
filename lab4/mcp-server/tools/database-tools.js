/**
 * Database Tools for MCP Server
 * Provides database query capabilities to Bob
 */

const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 10,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Connection event handlers
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Helper function to execute queries safely
async function executeQuery(query, params = []) {
  const client = await pool.connect();
  try {
    const startTime = Date.now();
    const result = await client.query(query, params);
    const executionTime = Date.now() - startTime;
    return {
      success: true,
      rows: result.rows,
      rowCount: result.rowCount,
      executionTime: `${executionTime}ms`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  } finally {
    client.release();
  }
}

const databaseTools = {
  name: 'database',
  description: 'Tools for querying and managing databases',
  
  tools: [
    {
      name: 'query_database',
      description: 'Execute a read-only SQL query against the database',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The SQL query to execute (SELECT only)'
          }
        },
        required: ['query']
      },
      handler: async (args) => {
        // Validate query is read-only
        const queryUpper = args.query.trim().toUpperCase();
        if (!queryUpper.startsWith('SELECT') && !queryUpper.startsWith('WITH')) {
          throw new Error('Only SELECT and WITH queries are allowed');
        }
        
        // Check for dangerous keywords
        const dangerousKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'CREATE', 'TRUNCATE'];
        if (dangerousKeywords.some(keyword => queryUpper.includes(keyword))) {
          throw new Error('Query contains forbidden keywords');
        }
        
        return await executeQuery(args.query);
      }
    },
    {
      name: 'get_table_schema',
      description: 'Get the schema information for a database table',
      inputSchema: {
        type: 'object',
        properties: {
          tableName: {
            type: 'string',
            description: 'Name of the table'
          }
        },
        required: ['tableName']
      },
      handler: async (args) => {
        const query = `
          SELECT
            column_name,
            data_type,
            character_maximum_length,
            is_nullable,
            column_default
          FROM information_schema.columns
          WHERE table_name = $1
          ORDER BY ordinal_position;
        `;
        
        const result = await executeQuery(query, [args.tableName]);
        
        if (!result.success) {
          return result;
        }
        
        // Get indexes
        const indexQuery = `
          SELECT indexname, indexdef
          FROM pg_indexes
          WHERE tablename = $1;
        `;
        
        const indexResult = await executeQuery(indexQuery, [args.tableName]);
        
        return {
          success: true,
          tableName: args.tableName,
          columns: result.rows.map(col => ({
            name: col.column_name,
            type: col.data_type,
            maxLength: col.character_maximum_length,
            nullable: col.is_nullable === 'YES',
            default: col.column_default
          })),
          indexes: indexResult.success ? indexResult.rows.map(idx => idx.indexdef) : []
        };
      }
    },
    {
      name: 'list_tables',
      description: 'List all tables in the database',
      inputSchema: {
        type: 'object',
        properties: {}
      },
      handler: async () => {
        const query = `
          SELECT table_name, table_type
          FROM information_schema.tables
          WHERE table_schema = 'public'
          ORDER BY table_name;
        `;
        
        return await executeQuery(query);
      }
    }
  ]
};

// Export both the tools and the pool for testing
module.exports = databaseTools;
module.exports.pool = pool;
module.exports.executeQuery = executeQuery;