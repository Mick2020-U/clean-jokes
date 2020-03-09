const { TestHelper } = require("uu_appg01_workspace-test");

beforeAll(async () => {
  await TestHelper.setup(null, {authEnabled:false});
  await TestHelper.initApp();
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Try to fix", () => {
  test("example 3 test - joke/create", async () => {
    let dtoIn = {
      name: " Joke",
      text: "Something funny"
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
   expect(result.data.uuAppErrorMap).toEqual({});
  });
});
