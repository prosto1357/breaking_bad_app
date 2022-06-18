import axios from "axios";

const baseURL = 'https://breakingbadapi.com/api'

const instance = axios.create({
  baseURL
})

export const episodesAPI = {
  getEpisodes() {
    return instance.get('episodes')
      .then(res => res.data)
  }
}