//Simulates the request using the JSON file.
export async function DataFetch() {
    let res = await fetch("/data.json");
    let data = await res.json();
    return data;
}

