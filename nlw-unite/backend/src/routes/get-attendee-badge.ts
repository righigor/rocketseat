import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/badge', {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          200: z.object({
            name: z.string(),
            email: z.string().email(),
            // badge: z.string(),
            event: z.object({
              title: z.string(),
            }),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      }
    }, async (request, reply) => {
      const { attendeeId } = request.params;

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            }
          },
        },
        where: { id: attendeeId }
      });

      if (!attendee) {
        return reply.status(404).send({ error: 'Attendee not found' });
      }

      return reply.status(200).send(attendee);
    });
}