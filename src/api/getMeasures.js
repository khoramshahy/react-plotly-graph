export async function getMeasures(){
    let measures = []

        const requestOptions = {
            method: 'GET',
            mode: 'no-cors',
            changeOrigin: true,
            headers: { 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': 'http://localhost:3000', "changeOrigin": true},
        };
        measures = await fetch('https://api.openaq.org/v2/measurements?limit=10000&page=1&offset=0&radius=9999&country_id=DE')
            .then(response => response.json())
            .then(data => { return data.results});


    return measures;

}