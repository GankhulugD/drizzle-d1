# my-app (drizzle-d1)

Quick notes for local development and where the DB lives.

Project layout (important files):

- `drizzle.config.ts` - Drizzle Kit config. Points to the schema and the local DB used for Studio/migrations.
- `src/db/schema.ts` - Drizzle ORM schema definitions (tables: `users`, `posts`).
- `drizzle/` - migration SQL files that Drizzle Kit uses to create the schema.
- `./db/dev.sqlite` - the stable local SQLite DB used for development and by Drizzle Studio.
- `scripts/seed-dev.js` - convenience seed script to insert sample data into `./db/dev.sqlite`.
- `package.json` - added scripts: `npm run migrate`, `npm run seed`, `npm run studio`.

How to reproduce a working local Drizzle Studio view:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run migrations to create the local DB (`./db/dev.sqlite`):

   ```bash
   npm run migrate
   ```

3. Seed the DB (only inserts when empty):

   ```bash
   npm run seed
   ```

4. Open Drizzle Studio (either the web studio or the VS Code extension) and point it at `./db/dev.sqlite`.
   - With the Drizzle CLI: `npm run studio` (this will start the studio server using the config file).
   - With the VS Code extension: open the workspace and use the extension command to open the local DB file.

Notes about Miniflare / wrangler state files:

- Miniflare creates ephemeral sqlite files under `.wrangler/state/...` for each run. Those are temporary and may be empty or deleted between runs. For a stable development experience, use `./db/dev.sqlite` as configured in `drizzle.config.ts`.

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
