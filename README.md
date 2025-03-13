To install dependencies:
```sh
bun install
```

To run server in development environment:
```sh
bun run dev
```

To run server in production environment:
```sh
bun run prod
```

open http://localhost:3000

## Docker Build Commands
### For Production
- docker build --target production -t udayagonuguntla/tweakai-prod:prod .
- docker push udayagonuguntla/tweakai-prod:prod
- docker run -p 3000:3000 udayagonuguntla/tweakai-prod:prod
### For Development
- docker build --target development -t udayagonuguntla/tweakai-dev:dev .
- docker push udayagonuguntla/tweakai-dev:dev
- docker run -p 3000:3000 udayagonuguntla/tweakai-dev:dev 

# Github guidelines
- Maintain two branches one for production(main) and other for development
- While creating a new feature create a branch from development with name FEATURE-feature-name
- If solving a bug create a branch from development or main which as per requirement with name FIX-bugname
- Frequently commit the code. Commit message must be in present tense. For example while pushing after fixing a bug commit message must be FIX-message where as while pushing a feature commit message must be FEATURE-message.
- If there is a code change in refactoring or cleaning of code then commit message must be CHORE-message
## Type of commit messages
- FEATURE - a new feature is introduced with the changes
- FIX - a bug fix has occurred
- CHORE - changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies or refactoring code)
- DOCS – updates to documentation such as a the README or other markdown files

## Example commits
- FEATURE: improve performance with lazy load implementation for images
- CHORE: update npm dependency to latest version
- CHORE: code clean up and build 
- FIX: bug preventing users from submitting the subscribe form
- INIT: Only for first commit and project setup

# Migration Script for running drizzle schemas
```sh
npx drizzle-kit generate

```