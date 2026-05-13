export interface Question {
  id: number;
  category: string;
  content: string;
  likes: number;
}

interface GitHubFileResponse {
  content: string;
  sha: string;
}

const GITHUB_API = "https://api.github.com";
const FILE_PATH = "data/questions.json";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

function getFileUrl() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  return `${GITHUB_API}/repos/${owner}/${repo}/contents/${FILE_PATH}`;
}

export async function readQuestions(): Promise<{ questions: Question[]; sha: string }> {
  const res = await fetch(getFileUrl(), {
    headers: getHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const data: GitHubFileResponse = await res.json();
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return { questions: JSON.parse(decoded).questions, sha: data.sha };
}

export async function writeQuestions(questions: Question[], sha: string): Promise<void> {
  const content = Buffer.from(JSON.stringify({ questions }, null, 2)).toString("base64");
  const res = await fetch(getFileUrl(), {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      message: `update questions [${new Date().toISOString()}]`,
      content,
      sha,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed: ${res.status} ${err}`);
  }
}
