export async function uploadToGithub(base64Image: string, fileName: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    throw new Error("Missing GitHub configuration in environment variables.");
  }

  // Remove the data:image/png;base64, part if it exists
  const content = base64Image.replace(/^data:image\/\w+;base64,/, "");
  
  const path = `uploads/${Date.now()}-${fileName}`;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      message: `Upload image: ${fileName}`,
      content: content,
      branch: branch,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub Upload Failed: ${error.message || response.statusText}`);
  }

  // Use raw.githubusercontent.com for a direct image URL
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}
