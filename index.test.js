// Helpers
const test = require('ava')

// Testing Subjects
const { toCamelCase, toSnakeCase } = require('.')

// Testing Data
const snake_case_data = {
  question_type: "string",
  created_at: "2018-02-20T18:43:17.104Z",
  template: {
    start_date: "2018-02-20",
    end_date: "2018-02-20",
    base_template: {
      created_at: "2018-02-20T18:43:17.104Z"
    }
  },
  variable: {
    created_at: "2018-02-20T18:43:17.104Z"
  },
  array_of_strings: [ "asdasd", "asdasd" ],
  good_questions: [
    { foo_bar: 'abc', bar_foo: 'dcb'},
    { abc_dfg: 'asdasd', asd_ad: 'kijd' }
  ]
}

const camelCaseData = {
  questionType: "string",
  createdAt: "2018-02-20T18:43:17.104Z",
  template: {
    startDate: "2018-02-20",
    endDate: "2018-02-20",
    baseTemplate: {
      createdAt: "2018-02-20T18:43:17.104Z"
    }
  },
  variable: {
    createdAt: "2018-02-20T18:43:17.104Z"
  },
  arrayOfStrings: [ "asdasd", "asdasd" ],
  goodQuestions: [
    { fooBar: 'abc', barFoo: 'dcb'},
    { abcDfg: 'asdasd', asdAd: 'kijd' }
  ]
}

test('toCamelCase transforms a snake_case object into a camelCase object', t => {
  t.deepEqual(toCamelCase(snake_case_data), camelCaseData)
})

test('toCamelCase transforms a snake_case Array object into a camelCase object', t => {
  t.deepEqual(toCamelCase([snake_case_data]), [camelCaseData])
})

test('toSnakeCase transforms a camelCase object into a snake_case object', t => {
  t.deepEqual(toSnakeCase(camelCaseData), snake_case_data)
})

test('toSnakeCase transforms a camelCase Array object into a snake_case object', t => {
  t.deepEqual(toSnakeCase([camelCaseData]), [snake_case_data])
})

test('Edge cases transforms a snake_case object with obj into a camelCase object', t => {
  const snake_case = { foo_key: { bar_value: 'bar' } }
  const camelCase = { fooKey: { barValue: 'bar' } }
  t.deepEqual(toCamelCase(snake_case), camelCase)
})

test('Edge cases transforms a snake_case object with array of strings into a camelCase object', t => {
  const snake_case = [ { array_of_string: [ 'foo' ] } ]
  const camelCase = [ { arrayOfString: [ 'foo' ] } ]
  t.deepEqual(toCamelCase(snake_case), camelCase)
})

test('Edge cases', t => {
  const camelCase = [ { id: '8e934cb8-870c-4c15-9f11-6c2098cdc6cd',
    externalIdentifier: 'ITEST015',
    externalIdentifierType: 'generic',
    identifier: 'C7D1FC',
    description: null,
    metadata: {},
    createdAt: '2018-05-25T21:34:56.161Z',
    updatedAt: '2018-05-25T21:34:56.161Z' } ]

  const snake_case = [ { id: '8e934cb8-870c-4c15-9f11-6c2098cdc6cd',
    external_identifier: 'ITEST015',
    external_identifier_type: 'generic',
    identifier: 'C7D1FC',
    description: null,
    metadata: {},
    created_at: '2018-05-25T21:34:56.161Z',
    updated_at: '2018-05-25T21:34:56.161Z' } ]

  t.deepEqual(toCamelCase(snake_case), camelCase)
})
