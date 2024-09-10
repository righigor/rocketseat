import {z} from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoalCompletion } from "../../functions/create-goal-completion";

export const createCompletionGoal: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/completions",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (requset) => {
      const { goalId } = requset.body;
      await createGoalCompletion({
        goalId,
      });
    }
  );
};
