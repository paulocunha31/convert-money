const convertButton = document.querySelector(".convert-button")
const conversionButton = document.querySelector(".arrow-button")
const currencyConverter = document.querySelector(".currency-converter")// primeiro select
const currencySelect = document.querySelector(".currency-select")// segundo select

// formata valor do input-currency
function formatValueInput(input) {

    let valor = input.value.replace(/[\D]+/g, '')
    valor = (valor / 100).toFixed(2)
    input.value = valor.replace('.', ',')

}


const currentDate = new Date()

const optionsFormatation = { day: 'numeric', month: '2-digit', year: 'numeric' }
const dateFormatted = currentDate.toLocaleDateString('pt-BR', optionsFormatation)

const outDate = document.getElementById("outDate")

outDate.value = dateFormatted


const convertValues = async () => {
    const inputCurrency = document.querySelector(".input-currency")
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") // valor digitado
    const currencyValueConverted = document.querySelector(".currency-value")// Outras moedas


    //  formata valor em real com vírgula para volor americano com ponto
    const inputCurrencyValue = (inputCurrency.value.replace(',', '.'))

    const selectOne = currencyConverter.value
    const selectTwo = currencySelect.value
    console.log(selectOne)

    await fetch(`https://open.er-api.com/v6/latest/${selectOne}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[selectTwo];
            const convertedAmount = (inputCurrencyValue * rate).toFixed(2);


            //////////////////////////// Primeiro Select ///////////////////////////////////
            if (currencyConverter.value == "BRL") {
                currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", { // formata moeda
                    style: "currency",
                    currency: "BRL"
                }).format(inputCurrencyValue, selectOne)


            }

            if (currencyConverter.value == "USD") { // Se o select estiver selecionado em dólar, entre aqui!
                currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(inputCurrencyValue, selectOne)



            }

            if (currencyConverter.value == "EUR") { // Se o select estiver selecionado em euro, entre aqui!
                currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-de", {
                    style: "currency",
                    currency: "EUR"
                }).format(inputCurrencyValue, selectOne)

            }



            if (currencyConverter.value == "GBP") { // Se o select estiver selecionado em bitcoin, entre aqui!
                currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "GBP"
                }).format(inputCurrencyValue, selectOne)
            }


            ////////////////////// Segundo Select /////////////////////////////////////////

            if (currencySelect.value == "BRL") {
                currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", { // formata moeda
                    style: "currency",
                    currency: "BRL"
                }).format(convertedAmount, selectTwo)



            }


            if (currencySelect.value == "USD") { // Se o select estiver selecionado em dólar, entre aqui!
                currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(convertedAmount, selectTwo)



            }

            if (currencySelect.value == "EUR") {
                currencyValueConverted.innerHTML = new Intl.NumberFormat("en-de", {
                    style: "currency",
                    currency: "EUR"
                }).format(convertedAmount, selectTwo)

            }

            if (currencySelect.value == "GBP") {
                currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "GBP"
                }).format(convertedAmount, selectTwo)


            }

        })
        .catch(error => console.log("Erro ao obter as taxas de câmbio:", error));


}


function invertValue() {

    const selectOne = document.querySelector(".currency-converter");
    const selectTwo = document.querySelector(".currency-select");

    let selectTextOne = selectOne[selectOne.options.selectedIndex].text

    let selecTextTwo = selectTwo[selectTwo.options.selectedIndex].text

    let acc = selectTextOne

    selectTextOne = selecTextTwo
    selecTextTwo = acc

    var text = selectTextOne
    for (let i = 0; i < selectOne.options.length; i++) {

        if (selectOne.options[i].text === text) {
            selectOne.selectedIndex = i;
            break
        }

    }

    var text = selecTextTwo
    for (let i = 0; i < selectTwo.options.length; i++) {
        if (selectTwo.options[i].text === text) {
            selectTwo.selectedIndex = i;
            break
        }

    }

    convertValues()
    changeCurrencyConverter()
    chageCurrency()

}


function changeCurrencyConverter() {
    const currency = document.querySelector(".currency")
    const currencyImageConverter = document.getElementById("currency-image-one-select")

    if (currencyConverter.value == "BRL") {
        currency.innerHTML = "Real"
        currencyImageConverter.src = "./assets/real.png"

    }

    if (currencyConverter.value == "USD") {
        currency.innerHTML = "Dólar Americano"
        currencyImageConverter.src = "./assets/dolar.png"
    }

    if (currencyConverter.value == "EUR") {
        currency.innerHTML = "Euro"
        currencyImageConverter.src = "./assets/euro.png"
    }



    if (currencyConverter.value == "GBP") {
        currency.innerHTML = "Libra Esterlina"
        currencyImageConverter.src = "./assets/libra.png"
    }

    convertValues()


}




function chageCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.getElementById("currency-image-two-select")



    if (currencySelect.value == "USD") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar.png"


    }

    if (currencySelect.value == "EUR") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }



    if (currencySelect.value == "GBP") {
        currencyName.innerHTML = "Libra Esterlina"
        currencyImage.src = "./assets/libra.png"
    }

    if (currencySelect.value == "BRL") {
        currencyName.innerHTML = "Real"
        currencyImage.src = "./assets/real.png"

    }



    convertValues()

}


currencySelect.addEventListener("change", chageCurrency)
convertButton.addEventListener("click", convertValues)
conversionButton.addEventListener("click", invertValue)
currencyConverter.addEventListener("change", changeCurrencyConverter)








