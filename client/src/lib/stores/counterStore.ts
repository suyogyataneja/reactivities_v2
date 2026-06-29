import {makeObservable, observable,action} from 'mobx';

export default class CounterStore {

    title = 'Counter App';
    count = 42;
    events:string[] =[
        `Initial count is ${this.count}`
    ]

    constructor(){
        makeObservable(this, {
            title: observable,
            count: observable,
            increment: action,  
            decrement: action
        })

    }
    // increment =() => {this.count++;}
    // decrement =() => {this.count--;}

    increment=(amount = 1 ) =>{
        this.count += amount
        this.events.push(`Incremented by ${amount} - count is now ${this.count}`)
    }

    decrement = (amount = 1 ) =>{
        this.count -=amount
        this.events.push(`Decremented by ${amount} - count is ${this.count}`)
    }

    get eventCount(){

        return this.events.length
    }
}