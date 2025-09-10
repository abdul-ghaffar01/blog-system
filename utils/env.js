const ENV = "PROD"
const BASE_URL = ENV === "DEV" ? "http://localhost:3000" : "https://blogs.iabdulghaffar.com"

export { ENV, BASE_URL }