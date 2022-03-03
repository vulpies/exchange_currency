const currencyOne = document.getElementById("currency-one"),
    currencyTwo = document.getElementById("currency-two"),
    amountOne = document.getElementById("first-amount"),
    amountTwo = document.getElementById("second-amount"),
    rateEl = document.getElementById("rate"),
    swap = document.getElementById("swap")

async function calculate() {
    const first = currencyOne.value
    const second = currencyTwo.value

    await fetch(`https://api.exchangerate.host/latest?base=${first}`)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.rates[second]
            rateEl.innerText = `1 ${first} = ${rate} ${second}`

            amountTwo.value = (amountOne.value * rate).toFixed(2)
        })
}

currencyOne.addEventListener("change", calculate)
currencyTwo.addEventListener("change", calculate)
amountOne.addEventListener("input", calculate)
amountTwo.addEventListener("input", calculate)

swap.addEventListener("click", () => {
    const temp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = temp
    calculate()
})

calculate()
