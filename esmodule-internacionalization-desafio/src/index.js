import Person from './person.js'
import TerminalController from './terminalController.js'

 const DEFAULT_LANG = 'pt-BR'
 const STOP_TERMINAL = ':q'

 const terminalController = new TerminalController()
 terminalController.initializeTerminial(DEFAULT_LANG)

 export default class Api {
    constructor(dependencies = terminalController) {
        this.terminalController = dependencies
    }

    async mainLoop() {
        try { 
            const answer = await terminalController.question()
            
            if(answer === STOP_TERMINAL) { 
                terminalController.closeTerminal()
                return;
            }

            const person = Person.generateInstanceFromStrig(answer)
            terminalController.updateTable(person.formatted(DEFAULT_LANG))
            terminalController.terminalService.save(person)
            return this.mainLoop()
        } 
        catch (err) {
            console.error('DEU RUIM**', err)
            return this.mainLoop()
        }
    } 
}

// adiciono NODE_ENV para teste (adicionado no Package.json)
if (process.env.NODE_ENV !== 'test') {
    const api = new Api()
    api.mainLoop()
}