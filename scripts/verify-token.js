const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load .env file
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error('Error: .env file not found at', envPath);
  process.exit(1);
}

const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_REPO_OWNER;
const repo = process.env.GITHUB_REPO_NAME;

async function verifyToken() {
  console.log('--- GitHub Token Verification ---');
  console.log(`Repository: ${owner}/${repo}`);
  
  if (!token) {
    console.error('❌ GITHUB_TOKEN is not defined in .env');
    return;
  }

  try {
    // 1. Check basic authentication and repository access
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!repoResponse.ok) {
      const error = await repoResponse.json();
      console.error(`❌ Failed to access repository: ${error.message}`);
      if (repoResponse.status === 401) {
        console.error('   Hint: Your token might be expired or invalid.');
      } else if (repoResponse.status === 403) {
        console.error('   Hint: Your token does not have permission to access this repository.');
      }
      return;
    }
    
    console.log('✅ Token can access the repository.');

    // 2. Check "Contents" permission by trying to fetch the uploads directory (or root)
    const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (contentsResponse.ok) {
      console.log('✅ Token has "Contents: Read" permission.');
    } else {
      const error = await contentsResponse.json();
      console.error(`❌ Failed to read repository contents: ${error.message}`);
      return;
    }

    // 3. Inform about write permission
    console.log('\n--- Action Required ---');
    console.log('Note: This script cannot safely test "Write" permissions without creating a dummy file.');
    console.log('Please ensure you have set "Contents: Read and write" in your GitHub Token settings:');
    console.log('https://github.com/settings/tokens?type=beta');
    console.log('\nOnce you have updated the permissions, try uploading an image in the app again.');

  } catch (error) {
    console.error(`❌ An unexpected error occurred: ${error.message}`);
  }
}

verifyToken();
