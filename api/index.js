import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

fastify.addHook('onRequest', (request, reply, done) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  reply.header('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === 'OPTIONS') {
    reply.send();
  } else {
    done();
  }
});

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.post('/create-user', async (request, reply) => {
  const { username } = request.body;
  try {
    let user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      user = await prisma.user.create({ data: { username } });
    }

    reply.send({ userId: user.id });
  } catch (error) {
    console.error('Error creating user:', error);
    reply.status(500).send('Error creating user.');
  }
});

fastify.post('/score', async (request, reply) => {
  const { userId, score, difficulty } = request.body;

  try {
    // Vérifier si un score existe déjà pour cet utilisateur et cette difficulté
    const existingScore = await prisma.score.findFirst({
      where: {
        userId: userId,
        difficulty: difficulty
      }
    });

    if (existingScore) {
      await prisma.score.update({
        where: {
          id: existingScore.id
        },
        data: {
          userscore: score
        }
      });
    } else {
    
      await prisma.score.create({
        data: {
          userId: userId,
          userscore: score,
          difficulty: difficulty
        }
      });
    }

    reply.send({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'ajout ou de la récupération des scores:", error);
    reply.status(500).send("Erreur lors de l'ajout ou de la récupération des scores");
  }
});




fastify.get('/scores', async (request, reply) => {
  const { difficulty } = request.query;

  try {
    const scores = await prisma.score.findMany({
      where: {
        difficulty: difficulty
      },
      orderBy: {
        userscore: 'asc'
      },
      include: {
        user: true
      }
    });

    reply.send(scores);
  } catch (error) {
    console.error("Erreur lors de la récupération des scores:", error);
    reply.status(500).send("Erreur lors de la récupération des scores");
  }
});



fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});