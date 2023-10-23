abstract class Taxi{
    protected _taxiNumber: string
    protected _taxiModel: 'Пассажирское' | 'Грузовое'

    constructor(taxiNumber: string, taxiModel: 'Пассажирское' | 'Грузовое'){
        this._taxiNumber = taxiNumber
        this._taxiModel = taxiModel
    }

    get taxiNumber(){
        return this._taxiNumber
    }

    set taxiNumber(taxiNumber: string){
        this._taxiNumber = taxiNumber
    }

    get taxiModel(){
        return this._taxiModel
    }

    set taxiModel(taxiModel: 'Пассажирское' | 'Грузовое'){
        this._taxiModel = taxiModel
    }

    ComputeCost(TripDuration: number, ...Passangers: Passanger[]){
        return ''
    }
}

class Passanger {
    private _name: string
    private _age: number
    private _mobile: string
    private _luggage: Luggage[] = []

    constructor(name: string, age: number, mobile: string, ...luggages: Luggage[]){
        this._name = name
        this._age = age
        this._mobile = mobile
        if (luggages){
            luggages.forEach((luggage) => {
                this._luggage.push(luggage)
            })
        }
    }

    get name(){
        return this._name
    }

    set name(name: string){
        this._name = name
    }

    get age(){
        return this._age
    }

    set age(age: number){
        this._age = age
    }

    get mobile(){
        return this._mobile
    }

    set mobile(mobile: string){
        this._mobile = mobile
    }

    get luggage(){
        return this._luggage
    }

    addLuggage(title: string, weight: number, volume: number){
        this._luggage[title] = {'weight': weight, 'volume': volume}
    }

    removeLuggage(title: string) {
        delete(this._luggage[title])
    }
}

class Luggage {
    private _weight: number
    private _size: number

    constructor(weight: number, size: number){
        this._weight = weight
        this._size = size
    }

    get weight(){
        return this._weight
    }

    set weight(weight){
        this._weight = weight
    }

    get size(){
        return this._size
    }

    set size(size: number){
        this._size = size
    }
}

class PassangerCar extends Taxi {
    taxiDriver: string
    taxiType: 'Эконом' | 'Комфорт' | 'Бизнес'
    tripCost: number
    maxLuggageWeight: number
    maxLuggageVolume: number

    constructor(driver: string, taxiNumber: string, taxiModel: 'Пассажирское' | 'Грузовое', taxiType: 'Эконом' | 'Комфорт' | 'Бизнес' ,maxLuggageWeight: number, maxLuggageVolume: number, tripCost: number){
        super(taxiNumber, taxiModel)
        this.taxiType = taxiType
        this.tripCost = tripCost
        this.taxiDriver = driver
        this.maxLuggageWeight = maxLuggageWeight
        this.maxLuggageVolume = maxLuggageVolume
    }

    ComputeCost(TripDuration: number, ...passangers: Passanger[]) {
        let coeff: number
        switch(this.taxiType){
            case 'Бизнес':
                coeff = 0.5
                break
            case 'Комфорт':
                coeff = 1
                break
            case 'Эконом':
                coeff = 1.5
                break
        }
        
        const TotalPrice = TripDuration * this.tripCost * coeff
        return `Приготовьтесь к поездке, ваш водитель ${this.taxiDriver}, номер машины ${this.taxiNumber}, ${this.taxiType}, ${this.taxiModel}, стоимость поездки составит: ${TotalPrice} рублей`
    }
}

class Truk extends Taxi {
    taxiDriver: string
    tripCost: number
    loader: boolean

    constructor(driver: string, taxiNumber: string, taxiModel: 'Пассажирское' | 'Грузовое', tripCost: number, loader: boolean){
        super(taxiNumber, taxiModel)
        this.tripCost = tripCost
        this.taxiDriver = driver
        this.loader = loader
    }

    ComputeCost(TripDuration: number, ...passangers: Passanger[]) {
        const TotalPrice = TripDuration * this.tripCost 

        return `Приготовьтесь к поездке, ваш водитель ${this.taxiDriver}, номер машины ${this.taxiNumber}, тип машины ${this.taxiModel}, стоимость поездки составит: ${TotalPrice} рублей`
    }
}

type Cars = PassangerCar | Truk

class TaxiCompany {
    companyName: string
    carList: Cars[]
    constructor(companyName: string, ...carList: Cars[]){
        this.companyName = companyName
        this.carList = carList
    }

    callTaxi(tripDuration: number, ...passangers: Passanger[]){
        let weight = 0
        let size = 0
        let status = ''
        passangers.forEach((passanger) => {
            passanger.luggage.forEach((luddage) => {
                weight += luddage.weight
                size += luddage.size
            })
        })

        this.carList.forEach((car) => {
            if(car instanceof PassangerCar){
                if (passangers.length > 4){
                    status =  'Группа студентов больше 4, уехать всем вместе не получится'
                }

                if (size < car.maxLuggageVolume && weight < car.maxLuggageWeight) {
                    status = car.ComputeCost(tripDuration, ...passangers)
                }
            }
        })

        if(status !== ''){
            return status
        }

        console.log('Не удалось найти пассажирское такси для вашей группы, ищем грузовое')

        this.carList.forEach((car) => {
            if(car instanceof Truk){
                if (passangers.length > 2){
                    status = 'Группа студентов больше 2, уехать всем вместе не получится.'
                } else {
                    status = car.ComputeCost(tripDuration, ...passangers)
                }
            }
        })

        if(status !== ''){
            return status
        }

        return status + ' Разделитесь на группы или уменьшите вес и объём багажа'
    }
}

const Kostya = new Passanger('Костя', 18, '89082119164', new Luggage(15, 10*10), new Luggage(10, 9*9))
const Sergey = new Passanger('Сергей', 22, '87655423244', new Luggage(20, 15*10), new Luggage(5, 100*20))
const Anton = new Passanger('Антон', 21, '89072334343', new Luggage(30, 80*20))
const Oleg = new Passanger('Олег', 21, '89072334343', new Luggage(50, 80*20))
const Jeka = new Passanger('Евгений', 21, '89072334343')

const ArnoldTaxi = new PassangerCar('Арнольд', 'СТ120О', 'Пассажирское', 'Бизнес', 45, 50*50, 120)
const ArnoldTruk = new Truk('Арни', 'БМ182В', 'Грузовое', 200, false)

const FasterCompany = new TaxiCompany('БыстроИТочка', ArnoldTaxi, ArnoldTruk)

console.log(FasterCompany.callTaxi(10, Oleg, Anton, Sergey));
