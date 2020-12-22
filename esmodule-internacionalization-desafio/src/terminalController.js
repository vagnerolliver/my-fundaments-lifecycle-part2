import readline from 'readline'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'
import Person from './person.js'
import TerminalService from './terminalService.js'
const defaultFactory = () => ({
    terminalService: new TerminalService()
})
export default class TerminalController {
    constructor(dependencies = defaultFactory()) {
        this.print = {}
        this.data = {}  
        this.terminalService = dependencies.terminalService  
    }

    async initializeTerminial(language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readline.createInterface({
            input: process.stdin, 
            output: process.stdout
        })

        const database = await this.terminalService.read()
        this.initializeTable(database, language)
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)

        this.print = console.draft(table)
        this.data = data
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.getTableOptions(), this.data))
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal() {
        this.terminal.close()
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [ 
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.magenta("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
                { field: "from", name: chalk.magenta("From") },
                { field: "to", name: chalk.cyan("To") }, 
            ]
        }
    }
    
}