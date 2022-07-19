const listHelper = require('../utils/list_helper')

describe('returns one',() => {
  const blogs = []
  test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
  }
  )
}
)