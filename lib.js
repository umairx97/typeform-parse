const { FLAT_TYPES } = require('./constants')

module.exports = {
  parseAnswerField,
  getQuestionRef,
  findAnswerByRef
}

function parseAnswerField (data, separator) {
  if (!data) return null
  const { type } = data

  if (FLAT_TYPES.includes(type)) return data[type]

  if (type === 'choices') {
    if (!data.choices.labels) return data.choices.other

    return data.choices.other
      ? [...data.choices.labels, data.choices.other].join(separator || ',')
      : data.choices.labels.join(separator || ',')
  }

  switch (type) {
    case 'choice': return data.choice.label
    case 'dropdown': return data.text

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
