const {
  concat, zipObj, keys, values, map, isEmpty, curry, __,  is, length, ifElse,
  compose, identity, not, or, cond, T
} = require('ramda')
const { isArray, isObj, isString, isInteger } = require('ramda-adjunct')

const replace = s => r => fn => s.replace(r, fn)

const camelCase = str => replace(str)(/[-_]([a-z])/g)(m => m[1].toUpperCase())

const snakeCase = str => replace(str)(/([A-Z])/g)(x => concat('_', x.toLowerCase()))

const parseValues = (fn) => cond([
  [ isArray, map(mapKeys(fn)) ],
  [ isObj,   mapKeys(fn) ],
  [ T,       identity ]
])

const parse = curry(
  (fn, obj) => zipObj(map(fn, keys(obj)), map(parseValues(fn), values(obj)))
)

const shouldParse = compose(not, x => or(isString(x), isInteger(x)))

const mapKeys = (fn) => (obj) =>
  ifElse(shouldParse, parse(fn), identity)(obj)

const fold = curry((fn, value) => isArray(value) ? map(fn, value) : fn(value))

const toCamelCase = fold(mapKeys(camelCase), __)

const toSnakeCase = fold(mapKeys(snakeCase), __)

module.exports = {
  camelCase,
  snakeCase,
  parseValues,
  parse,
  mapKeys,
  fold,
  toCamelCase,
  toSnakeCase,
}
