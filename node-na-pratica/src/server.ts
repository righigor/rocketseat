import fastify from "fastify";
import { z } from "zod";
import { sql } from "./lib/postgres";
import { redis } from "./lib/redis";

const app = fastify();

app.get('/:code', async (request, reply) => {
  const getLinkSchema = z.object({
    code: z.string().min(3),
  })

  const { code } = getLinkSchema.parse(request.params);

  const result = await sql`
    SELECT id, original_url FROM short_links WHERE short_links.code = ${code}
  `;

  const link = result[0];

  if (result.length === 0) {
    return reply.status(404).send({ error: 'Not found' });
  }

  await redis.zIncrBy('metrics', 1, String(link.id))

  return reply.redirect(301, link.original_url);
});

app.get('/api/links', async () => {
  const links = await sql`SELECT * FROM short_links`;

  return links;
});

app.post('/api/links', async (request, reply) => {
  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  })
  const { code, url } = createLinkSchema.parse(request.body);

  const result = await sql`
    INSERT INTO short_links (code, original_url) VALUES (${code}, ${url})
    RETURNING id
  `;

  const link = result[0];

  return reply.status(201).send({ shortlinkId: link.id });
});

app.get('/api/metrics', async () => {
  const result = await redis.zRangeByScoreWithScores('metrics', 0, -1);

  const metrics = result.sort((a, b) => b.score - a.score);
  return result;
});

app.listen({
  port: 4040,
}).then(() => {
  console.log('Server is running on port 4040');
});
