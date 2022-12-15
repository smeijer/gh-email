const [username] = process.argv.splice(2);

// HACK fetch is experimental, this silences the experimental warning
const emit = process.emit.bind(process)
process.emit = (...args) => args[1].name === 'ExperimentalWarning' ? undefined : emit(...args);

if (typeof fetch !== 'function') {
  console.error('Please run this script in a node version that ships with fetch');
  process.exit(1);
}

if (typeof username !== 'string') {
  console.log(`Usage: node github-email.ts <username>`)
  process.exit(1);
}

if (!process.env.GITHUB_TOKEN) {
  console.log(`GITHUB_TOKEN is not set. Skipping...`);
  console.log(`To enable, open https://github.com/settings/tokens/new?description=github-email, keep checkboxes unchecked, and click "Generate token".`);
  process.exit(1);
}

function gh(path) {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      'authorization': `token ${process.env.GITHUB_TOKEN}`,
    },
  }).then(x => x.json());
}

function handle(email) {
  if (!email || email.endsWith('@users.noreply.github.com')) return;
  console.log(email);
  process.exit(0);
}

async function main() {
  // public email
  const user = await gh(`/users/${username}`);
  handle(user.email);

  // emails from owned-repo recent activity'
  const repos = await gh(`/users/${username}/repos?type=owner&sort=updated`);
  if (!repos?.length) return;

  const commits = await gh(`/repos/${repo.full_name}/commits?author=${username}`);
  commits.forEach(x => handle(x.commit.author.email));
}

main();
