# Typeform-parse

Javascript library made specifically to parse typeform responses, is able to parse any type for questions 
and return the submitted reponses, regardless if they are simple "text" or multiple "choice"

**Note**: See examples.js for more examples on how to use the lib
## Usage:
```javascript
const typeformParse = require('typeform-parse')

// you'll need to create this reference map yourself and match the question ref-ids from typeform dashboard
const refMap = { answer1: "5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f" };

// you'll get this from typeform within reponses api and webhooks
const answers = [ 
  {
    field: {
      id: "83P8UV3K7yMs",
      ref: "5a69fc2b-07ca-42f2-bfbb-8eace6da6d9f",
      type: "multiple_choice",
    },
    type: "choice",
    choice: { id: "3FOG4jSbHR1R", label: "test response" },
  }
];

// Output - { answer1:  'test response' } 
const result = typeformParse(refMap, answers) 
```



## Author:

[umairx97](https://github.com/umairx97)
