import { createMocks } from "node-mocks-http";
import { createBroaController } from "../../../../features/api/broas/controllers/createBroaController";

describe("/api/broas/edit", () => {
  test("returns status 400 caused by a validation error", async () => {
    const { res, req } = createMocks({
      method: "POST",
      body: {
        author: "teste",
        rightVersion: "testando",
        wrongVersion: "",
      },
    });

    await createBroaController(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  test("returns status 201 and a new broa", async () => {
    const { res, req } = createMocks({
      method: "POST",
      body: {
        author: "teste",
        rightVersion: "testando",
        wrongVersion: "tesstando",
      },
    });

    await createBroaController(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toHaveProperty("author", "teste");
  });
});
