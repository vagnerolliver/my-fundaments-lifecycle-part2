import { describe, it } from 'mocha'
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'

describe('Person', () => {
    it("should return a person instance from a string", () => {
        const person = Person.generateInstanceFromStrig(
            '1 bike 2000 2020-01-01 2020-02-01'
        )
        const expected = {
            id: '1',
            vehicles: [ 'bike' ],
            kmTraveled: '2000',
            from: '2020-01-01',
            to: '2020-02-01'
        }
        
        expect(person).to.be.deep.equal(expected)
    })

    it("should format values", () => { 
        const person = new Person({ 
            id: '1',
            vehicles: [ 'bike' ],
            kmTraveled: '2000',
            from: '2020-01-01',
            to: '2020-02-01'
        })
        const result = person.formatted('pt-BR')
        const expected = {
            id: 1,
            vehicles: 'bike',
            kmTraveled: '2.000 km',
            from: '01 de janeiro de 2020',
            to: '01 de fevereiro de 2020'
        }
        expect(result).to.be.deep.equal(expected)
    })
 })