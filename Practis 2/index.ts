class Taxi {
    private readonly _numberOfCar: number
    private readonly _driver: string
    private readonly _price: number
    private _passangerList: Passanger[]
    
    constructor(numberOfCar:number, driver:string) {
        this._numberOfCar = numberOfCar
        this._driver = driver
        this._price = 40 //рублей за километр
        this._passangerList = []
    }

    get numberOfCar() {
        return this._numberOfCar
    }

    get driver() {
        return this._driver
    }

    get passangerList() {
        return this._passangerList
    }

    addPassanger(...passangers:Passanger[]) {
        passangers.forEach((Pass) => {
            if (this._passangerList.length <= 3){
                this._passangerList.push(Pass)
                console.log(`The passanger ${Pass.name} got into the car`)
            }
            else {
                console.log(`Car is full`);
                return
            }
        })
    }

    outPassanger(passanger:Passanger){
        const index = this._passangerList.indexOf(passanger, 0);
        if (index > -1) {
            this._passangerList.splice(index, 1);
            console.log(`Passanger ${passanger.name} removed from car`)
        } else {
            console.log(`There is no ${passanger.name} passenger in the car`);
            
        }
    }

    private totalPrice(TripLength: number){
        let totalPrice: number = TripLength * this._price / this._passangerList.length
        this._passangerList.forEach((Pass: Passanger) => {
            Pass.setTotalPrice(totalPrice)
        })
    }

    private clearPassangerList(){
        this._passangerList = []
    }

    trip(TripLength: number){
        this.totalPrice(TripLength)
        this.clearPassangerList()
        return 'Trip has ended, be careful!'
    }
}

class Passanger {
    private _name: string
    private _age: number
    private _totalprice: number

    constructor(name: string, age: number){
        this._name = name
        this._age = age
        this._totalprice = 0
    }

    get name(){
        return this._name
    }

    get age(){
        return this._age
    }

    setTotalPrice(totalPrice: number){
        this._totalprice = totalPrice
    }

    getTotalPrice() {
        return this._totalprice
    }
}

let TaxiJeka = new Taxi(333, 'Жека')

let Jone = new Passanger('Джон', 21)
let Sasha = new Passanger('Саша', 19)
let Sergey = new Passanger('Сергей', 22)
let Gray = new Passanger('Грэй', 35)
let Mike = new Passanger('Майк', 15)
