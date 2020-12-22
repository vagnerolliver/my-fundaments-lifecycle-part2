import { save , read} from './repository.js'

export default class TerminalService {
    constructor() {}

    save(person) {
        save(person)
    }

    async read() {
        return await read()
    }
}