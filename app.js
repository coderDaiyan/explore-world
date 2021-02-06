fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => {
        const countriesDiv = document.getElementById('countries')
        for (let i = 0; i < data.length; i++) {
            const country = data[i];
            const countryDiv = document.createElement("div")
            countryDiv.className = "country"

            const countryInfo = `
            <h3>${country.name}</h3>
            <p>${country.capital}</p>
            <button onclick="displayCountryDetail('${country.name}')" class="btn btn-success">More Details</button>
            `

            countryDiv.innerHTML = countryInfo

            countriesDiv.appendChild(countryDiv)
        }
    })

    const displayCountryDetail = name => {
        const url = `https://restcountries.eu/rest/v2/name/${name}`
        fetch(url)
        .then(res => res.json())
        .then(data => renderCountryInfo(data[0]))
    }

    const renderCountryInfo = country => {
        const countriesDiv = document.getElementById('countries')
        const countryDetailDiv = document.getElementById('countryDetail')
        countryDetailDiv.innerHTML = `
        <h1>${country.name}</h1>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area}</p>
        <p>Region: ${country.region}</p>
        <p>Currency: ${country.currencies[0].name}, Symbol: ${country.currencies[0].symbol}</p>
        <p>Language: ${country.languages[0].name}, Native Name: ${country.languages[0].nativeName}</p>
        <p>Top level domain: ${country.topLevelDomain}</p>
        <p>Time Zones: ${country.timezones[0]}</p>
        <p>Alternative Spellings: ${country.altSpellings[0]}</p>
        <img src="${country.flag}">
        `
        countryDetailDiv.style.display = "block"
        countriesDiv.style.display = "none"

    }
