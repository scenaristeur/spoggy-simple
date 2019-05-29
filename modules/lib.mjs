export const repeat = (string) => `${string} ${string}`;
export function shout(string) {
  document.getElementById("app2").innerHTML=string.toUpperCase();
  console.log(document.getElementById("app2"))
  return `${string.toUpperCase()}!`;
}
console.log("LIB")
console.log("HHTML in lib",hyperHTML)
