import axios from 'axios'

const baseURL = 'https://www.jsonbulut.com/json/'
const ref = 'd1becef32825e5c8b0fc1b096230400b'

export const config = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  params: { ref: ref },
  //headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }
})