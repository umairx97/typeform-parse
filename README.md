# Typeform-parse

Javascript library made specifically to parse typeform responses, is able to parse any type for questions 
and return the submitted reponses, regardless if they are simple "text" or multiple "choice"

## Usage:

`parseAnswersByRefs (refMap, answers)`

`parseAnswersByRefs (refMap, answers, separator)`

```javascript
// create this yourself and match the question ref-ids from typeform dashboard
const refMap = { answer1: "5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f" };

// you'll get this from typeform withing reponses api and webhooks
const answers = [ 
  {
    field: {
      id: "83P8UV3K7yMs",
      ref: "5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f",
      type: "multiple_choice",
    },
    type: "choice",
    choice: { id: "3FOG4jSbHR1R", label: "answer1 - test response" },
  }
];

// Output - { answer1:  'answer1 - test response' } 
const result = parseAnswersByRefs (refMap, answers) 

```

## Author:

[umairx97](https://github.com/umairx97)
