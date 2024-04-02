import { generateSlug } from '../utils/generate-slug';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function createEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events', {
      schema: {
        body: z.object({
          title: z.string().min(5),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      }
    }, async (request, reply) => {
  
    const data = request.body;
    const slug = generateSlug(data.title);
  
    const existingSlug = await prisma.event.findUnique({
      where: { slug },
    });
  
    if (existingSlug) {
      reply.status(400).send({
        error: 'A event with this title already exists',
      });
      return;
    }
  
    const event = await prisma.event.create({
      data: {
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAttendees,
        slug: generateSlug(data.title),
      }
    });
  
    reply.status(201).send({ eventId: event.id });
  });
}
