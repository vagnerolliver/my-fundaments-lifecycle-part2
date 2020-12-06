import database from '../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'


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
        console.log('person', person.formatted(DEFAULT_LANG))

        return mainLoop()
     } 
     catch (err) {
         console.error('DEU RUIM**', err)
         return mainLoop()
     }
 } 

 await mainLoop()
 

