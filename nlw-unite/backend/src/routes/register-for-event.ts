import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events/:eventId/attendees', {
      schema: {
        body: z.object({
          name: z.string().min(5),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number().int(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      }
    }, async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;

      const attendeeExists = await prisma.attendee.findUnique({
        where: {
          email_eventId: {
            email,
            eventId,
          }
        }
      });

      if (attendeeExists) {
        return reply.status(400).send({ error: 'Attendee already registered for this event' });
      };

      const [event, numberOfAttendees] = await Promise.all([
        prisma.event.findUnique({ where: { id: eventId } }),
        prisma.attendee.count({
          where: {
            eventId,
          }
        })
      ]);

      if (event?.maximumAttendees && numberOfAttendees >= event?.maximumAttendees) {
        return reply.status(400).send({ error: 'Event is full' });
      }

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId,
        }
      });
      return reply.status(201).send({ attendeeId: attendee.id });
    });
}