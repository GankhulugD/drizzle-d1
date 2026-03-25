#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync } from "fs";

const dbPath = "./db/dev.sqlite";

if (!existsSync(dbPath)) {
  console.error(
    `Dev database not found at ${dbPath}. Run migrations first: npm run migrate`,
  );
  process.exit(1);
}

function run(sql) {
  // Escape double quotes for shell-safe usage
  const safe = sql.replace(/"/g, '\\"');
  return execSync(`sqlite3 ${dbPath} "${safe}"`).toString().trim();
}

try {
  const usersCount = Number(run("SELECT COUNT(*) FROM users;") || 0);
  if (usersCount === 0) {
    run("INSERT INTO users (name,email) VALUES ('Alice','alice@example.com');");
    // Use last_insert_rowid() to link the post to the created user
    run(
      "INSERT INTO posts (title,content,userId) VALUES ('Hello','First post', last_insert_rowid());",
    );
    console.log("Seeded dev database with 1 user and 1 post.");
  } else {
    console.log(`Dev DB already seeded: ${usersCount} users found.`);
  }
} catch (err) {
  console.error("Failed to seed dev DB:", err.message);
  process.exit(1);
}
