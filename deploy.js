const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  github: {
    repository: 'https://github.com/soorihai2/new-4.git',
    branch: 'main'
  },
  plesk: {
    host: 'carri.in',
    username: 'carri',
    password: 'QbxLdOe3i',
    path: '/var/www/vhosts/carri.in/httpdocs'
  },
  watchFiles: [
    'test.php',
    'api/**/*.php',
    'src/**/*.js',
    'src/**/*.css',
    'public/**/*'
  ]
};

// Function to execute shell commands
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn(`Command stderr: ${stderr}`);
      }
      console.log(`Command stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Function to push changes to GitHub
async function pushToGitHub() {
  try {
    console.log('Pushing changes to GitHub...');
    
    // Add all changes
    await executeCommand('git add .');
    
    // Commit changes with timestamp
    const timestamp = new Date().toISOString();
    await executeCommand(`git commit -m "Auto-deploy: ${timestamp}"`);
    
    // Push to GitHub
    await executeCommand(`git push origin ${config.github.branch}`);
    
    console.log('Successfully pushed changes to GitHub');
    return true;
  } catch (error) {
    console.error('Failed to push changes to GitHub:', error);
    return false;
  }
}

// Function to deploy to Plesk
async function deployToPlesk() {
  try {
    console.log('Deploying to Plesk...');
    
    // Use SCP or another method to transfer files to Plesk
    // This is a simplified example - you might want to use a more robust solution
    const scpCommand = `scp -r ./* ${config.plesk.username}@${config.plesk.host}:${config.plesk.path}`;
    
    await executeCommand(scpCommand);
    
    console.log('Successfully deployed to Plesk');
    return true;
  } catch (error) {
    console.error('Failed to deploy to Plesk:', error);
    return false;
  }
}

// Main deploy function
async function deploy() {
  console.log('Starting deployment process...');
  
  const githubSuccess = await pushToGitHub();
  
  if (githubSuccess) {
    await deployToPlesk();
  }
  
  console.log('Deployment process completed');
}

// Watch for file changes
function watchForChanges() {
  console.log('Watching for file changes...');
  
  config.watchFiles.forEach(filePattern => {
    const files = filePattern.includes('*') 
      ? getFilesFromPattern(filePattern)
      : [filePattern];
    
    files.forEach(file => {
      if (fs.existsSync(file)) {
        fs.watchFile(file, { interval: 1000 }, async (curr, prev) => {
          if (curr.mtime !== prev.mtime) {
            console.log(`File ${file} has been modified`);
            await deploy();
          }
        });
        console.log(`Watching file: ${file}`);
      }
    });
  });
}

// Helper function to get files from a pattern
function getFilesFromPattern(pattern) {
  // This is a simplified implementation
  // In a real-world scenario, you might want to use a library like glob
  const [dir, filePattern] = pattern.split('/**/');
  const files = [];
  
  function traverseDirectory(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (entry.isFile() && (filePattern === '*' || entry.name.endsWith(filePattern.replace('*', '')))) {
        files.push(fullPath);
      }
    }
  }
  
  if (fs.existsSync(dir)) {
    traverseDirectory(dir);
  }
  
  return files;
}

// Start the watcher
watchForChanges();

// Also allow manual deployment
if (process.argv.includes('--deploy')) {
  deploy();
} 