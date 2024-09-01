export default async function useFetch(url: string) {
  let data = await fetch(url)
  console.log(data)
}