import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'

import database from '../database.json'
import Person from './person.js'

DraftLog(console).addLineListener(process.stdin)

const DEFAULT_LANG = 'pt-BR'
const options = {
    leftPad: 2,
    columns: [ 
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
        { field: "from", name: chalk.magenta("From") },
        { field: "to", name: chalk.cyan("To") }, 
    ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)))
const print = console.draft(table)

const terminal = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})

terminal.question('Olá, diga o seu  nome! ', (msg)=> {
    console.log('msg -->', msg.toString())
})



