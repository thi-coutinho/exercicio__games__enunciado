import app, { init } from "app";
import { cleanDb } from "../helpers";
import supertest from "supertest";
import { countConsoles, createConsole } from "../factories/console.factory";

beforeAll(async () => {
    await init();
  });
  
  beforeEach(async () => {
    await cleanDb();
  });
  
  const server = supertest(app);

  describe("POST /consoles", () => {
    it('should respond 201 and increse consoles in DB', async () => {
        const body = { name: "PS4"}
        const consolesBefore = await countConsoles()
        const response = await server.post("/consoles").send(body)
        const consolesAfter = await countConsoles()

        expect(response.status).toBe(201)
        expect(consolesBefore).toBe(consolesAfter - 1)

    })

    it('should respond 409 and not create console if it already exists', async () => {
        const body = { name: "PS4"}
        createConsole("PS4")
        const consolesBefore = await countConsoles()
        const response = await server.post("/consoles").send(body)
        const consolesAfter = await countConsoles()
        

        expect(response.status).toBe(409)
        expect(consolesBefore).toBe(consolesAfter)

    })

  })