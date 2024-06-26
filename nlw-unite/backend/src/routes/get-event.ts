import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../lib/prisma";

export async function getEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId', {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            title: z.string(),
            details: z.string().nullable(),
            slug: z.string(),
            maximumAttendees: z.number().int().nullable(),
            _count: z.object({
              Attendee: z.number().int(),
            }),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      }
    }, async (request, reply) => {
      const { eventId } = request.params;

      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          details: true,
          slug: true,
          maximumAttendees: true,
          _count: {
            select: {
              Attendee: true,
            }
          }
        },
        where: { id: eventId }
      });

      if (!event) {
        return reply.status(404).send({ error: 'Event not found' });
      }

      return reply.status(200).send(event);
    });
}