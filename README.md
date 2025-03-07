To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
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
