const test = require('tape')
const typeform = require('../')

test('parseAnswersByRefs, should correctly parse all types of answers', t => {
  const refMap = { testAnswer: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f' }

  const choiceAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'multiple_choice'
    },
    type: 'choice',
    choice: { id: '3FOG4jSbHR1R', label: 'choice answer' }
  }

  let parsedAnswer = typeform.parseAnswersByRefs(refMap, choiceAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: 'choice answer' })

  const yesAndNoAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'yes_no'
    },
    type: 'boolean',
    boolean: true
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, yesAndNoAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: true })

  const dropdownAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'dropdown'
    },
    type: 'text',
    text: 'Option 1'
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, dropdownAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: 'Option 1' })

  const emailAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'email'
    },
    type: 'email',
    email: 'typeform@test.com'
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, emailAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: 'typeform@test.com' })

  const fileUploadAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'file_upload'
    },
    type: 'file_url',
    file_url: 'https://test.com/example.jpg'
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, fileUploadAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: 'https://test.com/example.jpg' })

  const dateAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'date'
    },
    type: 'date',
    date: '2021-06-14'
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, dateAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: '2021-06-14' })

  const urlAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'url'
    },
    type: 'url',
    url: 'https://test.com/example.html'
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, urlAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: 'https://test.com/example.html' })

  const phoneNumberAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'phone_number'
    },
    type: 'phone_number',
    phone_number: '555-555-555'
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, phoneNumberAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: '555-555-555' })

  const multipleChoicesAnswer = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'multiple_choice'
    },
    type: 'choices',
    choices: {
      labels: ['Choice 1', 'Choice 2'],
      other: 'Choice Random'
    }
  }

  parsedAnswer = typeform.parseAnswersByRefs(refMap, multipleChoicesAnswer)
  t.deepEqual(parsedAnswer, { testAnswer: 'Choice 1,Choice 2,Choice Random' })

  const multipleChoicesAnswers = {
    field: {
      id: '83P8UV3K7yMs',
      ref: '5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f',
      type: 'multiple_choice'
    },
    type: 'choices',
    choices: {
      labels: ['Choice 1', 'Choice 2'],
      other: 'Choice Random'
    }
  }

  const separator = ';'
  parsedAnswer = typeform.parseAnswersByRefs(refMap, multipleChoicesAnswers, separator)
  t.deepEqual(parsedAnswer, { testAnswer: 'Choice 1;Choice 2;Choice Random' })
  t.end()
})
