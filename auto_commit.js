const fs = require("fs");
const { execSync } = require("child_process");

// Set up commit limits
const minCommits = 60;
const maxCommits = 150;
const numCommits = Math.floor(Math.random() * (maxCommits - minCommits + 1)) + minCommits;

const commitFile = "commit.txt";

// Ensure the commit file exists
if (!fs.existsSync(commitFile)) {
  fs.writeFileSync(commitFile, "GitHub contribution automation\n", "utf8");
}

// Function to execute shell commands
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing: ${command}\n`, error);
  }
};

// Make multiple commits
for (let i = 0; i < numCommits; i++) {
  fs.appendFileSync(commitFile, `Commit number ${i + 1} at ${new Date().toISOString()}\n`, "utf8");

  // Git commands
  runCommand("git add commit.txt");
  runCommand(`git commit -m "Auto commit ${i + 1}"`);

  // Simulate a delay to make commits appear natural
  const delay = Math.floor(Math.random() * 3000) + 1000; // 1-4 seconds
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
}

// Push changes to GitHub
runCommand("git push origin main"); // Change `main` if your default branch is different

console.log(`✅ Successfully made ${numCommits} commits!`);
