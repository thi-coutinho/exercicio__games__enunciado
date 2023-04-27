import app, { init } from "app";
import { cleanDb } from "../helpers";
import supertest from "supertest";
import { countGames } from "../factories/games.factory";
import { createConsole } from "../factories/console.factory";

beforeAll(async () => {
    await init();
  });
  
  beforeEach(async () => {
    await cleanDb();
  });
  
  const server = supertest(app);

  describe("POST /games", () => {
    it('should respond 201 and increse games in DB', async () => {
      const console = await createConsole("PS3")
      const body = { title: "MK11", consoleId: console.id}
      const gamesBefore = await countGames()
      const response = await server.post("/games").send(body)
      const gamesAfter = await countGames()

      expect(response.status).toBe(201)
      expect(gamesBefore).toBe(gamesAfter - 1)

    })
  })