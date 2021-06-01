const { parseAnswerField, findAnswerByRef, getQuestionRef } = require('./lib')

module.exports = typeformParse

/**
 * Primary function to parse all the answers provided by using a reference map object
 * parameters defined as below, and returns also an object with k-v pairs of answers submitted
 *
 * @param {Object} refMap - K-V Pair of fields and their correspond refs`
 * @param {Array} answers - Submissions from typeform; responses or webhooks api
 * @param {String} separator - optional, to separate multiple choice answers
 */
function typeformParse (refMap = {}, answers = [], separator = ',') {
  if (!Array.isArray(answers)) answers = [answers]
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
