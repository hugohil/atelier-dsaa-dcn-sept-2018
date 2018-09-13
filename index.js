'use strict'

const fs = require('fs')
const markdownpdf = require('markdown-pdf')
const replaceStream = require('replacestream')

const groups = 6

const words = {
  verbs: ['suivre','fuir','apercevoir','diriger','tourner','cacher'],
  adjectives: ['agité.e','immobile','symètrique','équitable','calme','pénible'],
  nouns: ['astre','circuit','étendue','arbre','oiseau','animal','boîte','bruit','bloc','fleur','surprise','mer']
}

;(() => {
  for (let i = 0; i < groups; i++) {
    const result = []

    const yournouns = []
    for (let n = 0; n < 2; n++) {
      const nounPicker = Math.floor(Math.random() * words.nouns.length)
      const noun = words.nouns.splice(nounPicker, 1)
      yournouns.push(noun)
    }

    const verbPicker = Math.floor(Math.random() * words.verbs.length)
    const verb = words.verbs.splice(verbPicker, 1)

    const adjectivePicker = Math.floor(Math.random() * words.adjectives.length)
    const adjective = words.adjectives.splice(verbPicker, 1)

    const yourwords = `* noms: ${yournouns[0]}, ${yournouns[1]}\n* verbe: ${verb}\n* adjectif: ${adjective}`
    console.log(`---\n${yourwords}`)

    fs.createReadStream('./README.md')
      .pipe(replaceStream('{{ your-words }}', yourwords))
      .pipe(markdownpdf({cssPath: './github.css'}))
      .pipe(fs.createWriteStream(`./exports/sujet-${i + 1}.pdf`))
  }
})()
