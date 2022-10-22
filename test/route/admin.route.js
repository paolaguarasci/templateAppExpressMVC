import app from '../../src/app.js'
import request from 'supertest'

describe("Test Admin Router", function () {
  beforeEach(() => {});
  afterEach(() => {});
  test('should return Hello World', async () => {
    const res = await request(app).get('/api/photos')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      message: "hello world"
    })
  })
});
