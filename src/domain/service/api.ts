import axios from "axios";

export const api = axios.create({
  baseURL: 'https://api.football-data.org/v4',
  headers: {"X-Auth-Token": "883d504d34a944dd850f6262389b0f12"},
});
