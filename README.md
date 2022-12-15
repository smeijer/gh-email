# gh-email

Retrieve the email address from a contributor, by github handle.

```shell
npx gh-email <github-handle>
```

## Requirements

- A node version that supports `fetch`. Node 18+ will do.
- A github token, set as `GITHUB_TOKEN` in your environment.

### How to create a github token?

1. Go to [github settings](https://github.com/settings/tokens/new?description=github-email). 
2. Keep all checkboxes unchecked.
3. Click "Generate token"
4. Copy the token to your profile or run `export GITHUB_TOKEN={token}`
