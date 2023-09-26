//task1

let task1 = document.querySelector('#task1')
let radio = task1.querySelectorAll('[type=radio]')
let buttonMath = task1.querySelector('.math')
let glueInput = task1.querySelector('.TypeGlue')
let paintInput = task1.querySelector('.TypePaint')


let type = ''

radio.forEach((e) => {
    e.addEventListener('click', (e) => {
        type = e.target.value
        if (type === 'Paint') {
            paintInput.classList.remove('hidden')
            glueInput.classList.add('hidden')
        } else if (type === 'Glue') {
            paintInput.classList.add('hidden')
            glueInput.classList.remove('hidden')
        }
        else {
            paintInput.classList.add('hidden')
            glueInput.classList.add('hidden')
        }
    })
})

buttonMath.addEventListener('click', () => {
    let RoomWidth = document.querySelector('#RWidth').value
    let RoomHeigh = document.querySelector('#RHeigh').value
    let RoomLength = document.querySelector('#RLength').value
    let PRoom = 2 * (Number(RoomHeigh) * Number(RoomWidth) + Number(RoomHeigh) * Number(RoomLength))
    if (type === 'Paint') {
        let cons = Number(document.querySelector('#Cons').value)
        let Consumption = Math.ceil(PRoom/cons)
        let price = Number(document.querySelector('#PPrice').value)
        alert(`${Consumption} литров краски понадобится для покраски комнаты. Цена: ${Consumption * price}`)
    } else if (type === 'Glue') {
        let WallpapperWidth = document.querySelector('#WPWidth').value
        let WallpapperHeigh = document.querySelector('#WPHeigh').value
        let Price = Number(document.querySelector('#WPPrice').value)
        let PWallpapper = Number(WallpapperWidth) * Number(WallpapperHeigh)
        let Consumption = Math.ceil(PRoom/PWallpapper)
        
        alert(`${Consumption} рулонов обоев понадобится для поклейки стен. Цена: ${Consumption * Price}`)
    }
    else {
        alert('Выберите вид ремонта')
    }
    
})
//-----------------------------------------------------------------------------//
//Task2

let Task2 = document.querySelector('#task2')
let ButtonCheckSpeed = Task2.querySelector('#CheckPunishment')

ButtonCheckSpeed.addEventListener('click', () => {
    let speed = Number(Task2.querySelector('#Speed').value)
    let deltaSpeed = speed - 110
    if (deltaSpeed <= 0) {
        alert('Скорость автомобиля допустима на данном участке')
    }
    else if (deltaSpeed > 0 && deltaSpeed <= 20){
        alert(`Превышение на ${deltaSpeed} км\\ч, штраф 500 рублей`)
    }
    else if (deltaSpeed >= 20 && deltaSpeed <= 40) {
        alert(`Превышение на ${deltaSpeed} км\\ч, штраф 1500 рублей`)
    }
    else if (deltaSpeed >= 40 && deltaSpeed <= 60) {
        alert(`Превышение на ${deltaSpeed} км\\ч, штраф 2500 рублей или лишение прав на 4 месяца`)
    }
    else if (deltaSpeed >= 60) {
        alert(`Превышение на ${deltaSpeed} км\\ч, штраф 5000 рублей или лишение прав на 6 месяцев`)
    }
})

//----------------------------------------------------------------------------------//
//Task 3
let task3 = document.querySelector('#task3')
let GenButton = task3.querySelector('#Generate')
let ClearButton = task3.querySelector('#Clear')
let textarea = task3.querySelector('#StudentList')
let minPullup = task3.querySelector('#BaddestStudent')
let maxPullup = task3.querySelector('#BetterStudent')


GenButton.addEventListener('click', () => {
    let Students = Number(task3.querySelector('#Student').value)
    textarea.value = ''
    let pullups = []
    let min = 21
    let max = 4 
    minPullup.value = ''
    maxPullup.value = ''
    for (let i = 0; i < Students; i++) {
        pullups.push(Math.floor(Math.random() * (20-5) + 5))
        if (pullups[i] > max) {
            max = pullups[i]
        }
        if (pullups[i] < min) {
            min = pullups[i]
        }
        if (pullups[i] < 12) {
            textarea.value += `Студент ${i+1} выполнил ${pullups[i]} подтягиваний, оценка 2\n`
        }
        else if (pullups[i] >= 12 && pullups[i] < 14) {
            textarea.value += `Студент ${i+1} выполнил ${pullups[i]} подтягиваний, оценка 3\n`
        }
        else if (pullups[i] >= 14 && pullups[i] < 16) {
            textarea.value += `Студент ${i+1} выполнил ${pullups[i]} подтягиваний, оценка 4\n`
        }
        else if (pullups[i] >= 16) {
            textarea.value += `Студент ${i+1} выполнил ${pullups[i]} подтягиваний, оценка 5\n`
        }
    }
    minPullup.value = `Минимальное число подтягивание: ${min}`
    maxPullup.value = `Максимально число подтягивание: ${max}`
})

ClearButton.addEventListener('click', () => {
    textarea.value = ''
    task3.querySelector('#Student').value = ''
    minPullup.value = ''
    maxPullup.value = ''
})
//-----------------------------------------------------------------------------//
//Task4
let task4 = document.querySelector('#task4')
let FindButton = task4.querySelector('#FindWord')
let LongestWord = task4.querySelector('#LongestWord')

FindButton.addEventListener('click', () => {
    let CommonText = task4.querySelector('#CommonText').value

    let WordArr = CommonText.split(' ')
    let longestWord = ''

    for (let i = 0; i < WordArr.length; i++) {
        if (longestWord.length < WordArr[i].length){
            longestWord = WordArr[i]
        }
    }

    task4.querySelector('#LongestWord').value = longestWord
})

//------------------------------------------------------------------------------//
//Task5
let task5 = document.querySelector('#task5')
let PasswordInput = task5.querySelector('#password')
let ValidateButton = task5.querySelector('#validate')

PasswordInput.addEventListener('mouseover', () => {
    PasswordInput.type = 'text'
    PasswordInput.focus();
    PasswordInput.selectionStart = PasswordInput.value.length;
})

PasswordInput.addEventListener('mouseout', () => {
    PasswordInput.type = 'password'
    PasswordInput.focus();
    PasswordInput.selectionStart = PasswordInput.value.length;
})

PasswordInput.addEventListener('input', () => {
    task5.querySelector('#MoreThan').classList.add('hidden')
    task5.querySelector('#LessThan').classList.add('hidden')
    task5.querySelector('#DigitalIn').classList.add('hidden')
    task5.querySelector('#SymbolIn').classList.add('hidden')
    task5.querySelector('#UpperIn').classList.add('hidden')
    task5.querySelector('#LowerIn').classList.add('hidden')
    task5.querySelector('#ok').classList.add('hidden')
})

ValidateButton.addEventListener('click', () => {
    let Password = task5.querySelector('#password').value
    let ValidatePassword = {
        'MoreThan': false,
        'LessThan': false,
        'DigitalIn': false,
        'SymbolIn': false,
        'UpperIn': false,
        'LowerIn': false
    }

    for (let i = 0; i < Password.length; i++) {
        if (Password.length >= 6) {
            ValidatePassword['MoreThan'] = true
        }
        if (Password.length <= 12) {
            ValidatePassword['LessThan'] = true
        }
        if (Password[i].match(/[1-9]+/g)) {
            ValidatePassword['DigitalIn'] = true
        }
        if (Password[i].match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/g)) {
            ValidatePassword['SymbolIn'] = true
        }
        if (Password[i].match(/[A-Z]+/g)) {
            ValidatePassword['UpperIn'] = true
        }
        if (Password[i].match(/[a-z]+/g)) {
            ValidatePassword['LowerIn'] = true
        }             
    }

    if (ValidatePassword['MoreThan'] === false) {
        task5.querySelector('#MoreThan').classList.remove('hidden')
    }
    if (ValidatePassword['LessThan'] === false) {
        task5.querySelector('#LessThan').classList.remove('hidden')
    }
    if (ValidatePassword['DigitalIn'] === false) {
        task5.querySelector('#DigitalIn').classList.remove('hidden')
    }
    if (ValidatePassword['SymbolIn'] === false) {
        task5.querySelector('#SymbolIn').classList.remove('hidden')
    }
    if (ValidatePassword['UpperIn'] === false) {
        task5.querySelector('#UpperIn').classList.remove('hidden')
    }
    if (ValidatePassword['LowerIn'] === false) {
        task5.querySelector('#LowerIn').classList.remove('hidden')
    }
    if(Object.values(ValidatePassword).every(item => item === true)){
        task5.querySelector('#ok').classList.remove('hidden')
    }
    
})




