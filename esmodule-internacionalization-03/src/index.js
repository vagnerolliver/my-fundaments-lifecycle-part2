import database from '../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'

 const DEFAULT_LANG = 'pt-BR'
 const STOP_TERMINAL = ':q'

 const terminalController = new TerminalController()
 terminalController.initializeTerminial(database, DEFAULT_LANG)


 async function mainLoop() {
     try { 
        const answer = await terminalController.question()
        
        if(answer === STOP_TERMINAL) { 
            terminalController.closeTerminal()
            return;
        }

        const person = Person.generateInstanceFromStrig(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        save(person)
        return mainLoop()
     } 
     catch (err) {
         console.error('DEU RUIM**', err)
         return mainLoop()
     }
 } 

 await mainLoop()
 

