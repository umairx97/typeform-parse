module.exports = {
  parseAnswerField,
  parseAnswersByRefs,
  findAnswerByRef,
  getQuestionRef
}

/**
 * Primary function to parse all the answers provided by using a reference map object
 * parameters defined as below, and returns also an object with k-v pairs of answers submitted
 *
 * @param {Object} refMap - K-V Pair of fields and their correspond refs
 *
 * ```javascript
 * const refMap = { answer1: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f' }
 * ```
 * @param {Array} answers
 *
 * ```javascript
 * const answers = [
  {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'multiple_choice'
    },
    type: 'choice',
    choice: {
      id: '3FOG4jSbHR1R',
      label: 'auditConfirmation - test response'
    }
  }
]
 * ```
 *
 * @param {String} separator - optional, to separate multiple choice answers
 */
function parseAnswersByRefs (refMap = {}, answers = [], separator = ',') {
  const result = {}

  for (const field in refMap) {
    /* Question Ref-id from typeform, e.g. a69fc2b-07ca-42f2-bfbb-8eace6da6d9f */
    const reference = getQuestionRef(refMap, field)
    /* finds the answer from the array of submissions on typeform */
    const answer = findAnswerByRef(answers, reference)
    result[field] = parseAnswerField(answer, separator)
  }

  return result
}

function parseAnswerField (data, separator) {
  if (!data) return null
  switch (data.type) {
    case 'text':
      return data.text
    case 'choice':
      return data.choice.label
    case 'boolean':
      return data.boolean
    case 'email':
      return data.email
    case 'dropdown':
      return data.text
    case 'phone_number':
      return data.phone_number
    case 'number':
      return data.number
    case 'date':
      return data.date
    case 'choices':
      if (!data.choices.labels) return data.choices.other
      return data.choices.other
        ? [...data.choices.labels, data.choices.other].join(separator || ',')
        : data.choices.labels.join(separator || ',')
    default:
      throw new Error('Unsupported type')
  }
}

function getQuestionRef (refMap = {}, field = '') {
  return refMap[field]
}

function findAnswerByRef (answers = [], ref = '') {
  return answers.find(({ field }) => field.ref === ref)
}
