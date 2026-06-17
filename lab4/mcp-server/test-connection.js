#!/usr/bin/env node

/**
 * Test script to verify database connection
 * Run with: node test-connection.js
 */

require('dotenv').config();
const { Pool } = require('pg');

// Create connection pool with environment variables
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

console.log('🔍 Testing database connection...\n');
console.log('Connection Details:');
console.log(`  Host: ${process.env.DATABASE_HOST}`);
console.log(`  Port: ${process.env.DATABASE_PORT}`);
console.log(`  Database: ${process.env.DATABASE_NAME}`);
console.log(`  User: ${process.env.DATABASE_USER}`);
console.log(`  SSL: ${process.env.DATABASE_SSL}`);
console.log('');

async function testConnection() {
  let client;
  
  try {
    // Test basic connection
    console.log('📡 Connecting to database...');
    client = await pool.connect();
    console.log('✅ Connection successful!\n');

    // Test query execution
    console.log('🔍 Testing query execution...');
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Query executed successfully!');
    console.log(`   Server Time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL Version: ${result.rows[0].pg_version.split(',')[0]}\n`);

    // Check tables
    console.log('📊 Checking database tables...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log('✅ Found tables:');
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
      console.log('');
    } else {
      console.log('⚠️  No tables found. Run the ingestion script to populate the database.\n');
    }

    // Check record counts
    console.log('📈 Checking record counts...');
    const countsResult = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as users_count,
        (SELECT COUNT(*) FROM products) as products_count,
        (SELECT COUNT(*) FROM orders) as orders_count
    `);
    
    const counts = countsResult.rows[0];
    console.log(`   Users: ${counts.users_count}`);
    console.log(`   Products: ${counts.products_count}`);
    console.log(`   Orders: ${counts.orders_count}`);
    console.log('');

    // Test a sample query
    console.log('🧪 Testing sample query...');
    const sampleResult = await client.query(`
      SELECT username, email, status 
      FROM users 
      WHERE status = 'active' 
      LIMIT 3
    `);
    
    if (sampleResult.rows.length > 0) {
      console.log('✅ Sample data retrieved:');
      sampleResult.rows.forEach(row => {
        console.log(`   - ${row.username} (${row.email}) - ${row.status}`);
      });
      console.log('');
    }

    console.log('✨ All tests passed! Database is ready to use.\n');
    
  } catch (error) {
    console.error('❌ Connection test failed!\n');
    console.error('Error Details:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Code: ${error.code || 'N/A'}`);
    
    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 Troubleshooting:');
      console.error('   - Check if DATABASE_HOST is correct');
      console.error('   - Verify network connectivity to the database');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Troubleshooting:');
      console.error('   - Check if the database is running');
      console.error('   - Verify DATABASE_PORT is correct');
      console.error('   - Check firewall rules');
    } else if (error.message.includes('password authentication failed')) {
      console.error('\n💡 Troubleshooting:');
      console.error('   - Verify DATABASE_USER and DATABASE_PASSWORD are correct');
      console.error('   - Check if the user has access to the database');
    } else if (error.message.includes('SSL')) {
      console.error('\n💡 Troubleshooting:');
      console.error('   - Set DATABASE_SSL=true for IBM Cloud databases');
      console.error('   - Verify SSL certificate configuration');
    }
    
    console.error('');
    process.exit(1);
    
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

// Run the test
testConnection().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});

// Made with Bob