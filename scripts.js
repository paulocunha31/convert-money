const convertButton = document.querySelector(".convert-button")
const conversionButton = document.querySelector(".arrow-button")
const currencyConverter = document.querySelector(".currency-converter")
const currencySelect = document.querySelector(".currency-select")
const modal = document.getElementById("modal-warning")
const textModal = document.getElementById("text-modal")



// format input-currency value
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
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") 
    const currencyValueConverted = document.querySelector(".currency-value")

// format real value with comma to American value with period
    const inputCurrencyValue = (inputCurrency.value.replace(',', '.'))

    const selectOne = currencyConverter.value
    const selectTwo = currencySelect.value


    await fetch(`https://open.er-api.com/v6/latest/${selectOne}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[selectTwo];
            const convertedAmount = (inputCurrencyValue * rate).toFixed(2);




            if (currencyConverter.value !== currencySelect.value) {



                //////////////////////////// First Select ///////////////////////////////////
                if (currencyConverter.value == "BRL") {
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", { // formata moeda
                        style: "currency",
                        currency: "BRL"
                    }).format(inputCurrencyValue, selectOne)


                }

                if (currencyConverter.value == "USD") { 
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                    }).format(inputCurrencyValue, selectOne)



                }

                if (currencyConverter.value == "EUR") { 
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-de", {
                        style: "currency",
                        currency: "EUR"
                    }).format(inputCurrencyValue, selectOne)

                }



                if (currencyConverter.value == "GBP") { 
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "GBP"
                    }).format(inputCurrencyValue, selectOne)
                }

                if (currencyConverter.value == "CHF") { 
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "CHF"
                    }).format(inputCurrencyValue, selectOne)
                }

                if (currencyConverter.value == "CNY") { 
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "CNY"
                    }).format(inputCurrencyValue, selectOne)
                }

                if (currencyConverter.value == "ARS") { 
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "ARS"
                    }).format(inputCurrencyValue, selectOne)
                }

                if (currencyConverter.value == "AUD") { 
                    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "AUD"
                    }).format(inputCurrencyValue, selectOne)
                }



                ////////////////////// Two Select /////////////////////////////////////////

                if (currencySelect.value == "BRL") {
                    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", { // formata moeda
                        style: "currency",
                        currency: "BRL"
                    }).format(convertedAmount, selectTwo)



                }


                if (currencySelect.value == "USD") { 
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

                if (currencySelect.value == "CHF") { 
                    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "CHF"
                    }).format(convertedAmount, selectTwo)
                }

                if (currencySelect.value == "CNY") { 
                    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "CNY"
                    }).format(convertedAmount, selectTwo)
                }

                if (currencySelect.value == "ARS") { 
                    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "ARS"
                    }).format(convertedAmount, selectTwo)
                }

                if (currencySelect.value == "AUD") { 
                    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "AUD"
                    }).format(convertedAmount, selectTwo)
                }




            } else {

                const text = currencyConverter[currencyConverter.options.selectedIndex].text

                textModal.innerHTML = `Não é permitido converter, ${text} para, ${text}.`
                let myModal = new bootstrap.Modal(modal)
                myModal.show()



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

    const textOne = selectTextOne
    for (let i = 0; i < selectOne.options.length; i++) {

        if (selectOne.options[i].text === textOne) {
            selectOne.selectedIndex = i;
            break
        }

    }

    const textTwo = selecTextTwo
    for (let i = 0; i < selectTwo.options.length; i++) {
        if (selectTwo.options[i].text === textTwo) {
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


    if (currencyConverter.value == "CHF") {
        currency.innerHTML = "Franco Suíço"
        currencyImageConverter.src = "./assets/franco-suico.png"
    }


    if (currencyConverter.value == "CNY") {
        currency.innerHTML = "Yuan Chinês"
        currencyImageConverter.src = "./assets/yuan-chines.png"
    }


    if (currencyConverter.value == "ARS") {
        currency.innerHTML = "Peso Argentino"
        currencyImageConverter.src = "./assets/peso-argentino.png"
    }


    if (currencyConverter.value == "AUD") {
        currency.innerHTML = "Dólar Australiano"
        currencyImageConverter.src = "./assets/dolar-autraliano.png"
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


    if (currencySelect.value == "CHF") {
        currencyName.innerHTML = "Franco Suíço"
        currencyImage.src = "./assets/franco-suico.png"
    }


    if (currencySelect.value == "CNY") {
        currencyName.innerHTML = "Yuan Chinês"
        currencyImage.src = "./assets/yuan-chines.png"
    }


    if (currencySelect.value == "ARS") {
        currencyName.innerHTML = "Peso Argentino"
        currencyImage.src = "./assets/peso-argentino.png"
    }


    if (currencySelect.value == "AUD") {
        currencyName.innerHTML = "Dólar Australiano"
        currencyImage.src = "./assets/dolar-autraliano.png"
    }


    convertValues()

}


currencySelect.addEventListener("change", chageCurrency)
convertButton.addEventListener("click", convertValues)
conversionButton.addEventListener("click", invertValue)
currencyConverter.addEventListener("change", changeCurrencyConverter)








