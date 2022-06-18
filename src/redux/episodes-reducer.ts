import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {AppStateType} from "./store";
import {episodesAPI} from "../api/api";
import {EpisodeType} from "../types/types";

const GET_EPISODES = 'episodes/GET_EPISODES'
const DELETE_EPISODE = 'episodes/DELETE_EPISODE'
const CHANGE_NUMBER_OF_CHARACTERS = 'episodes/CHANGE_NUMBER_OF_CHARACTERS'
const SORT_BY_NUMBER_OF_CHARACTERS = 'episodes/SORT_BY_NUMBER_OF_CHARACTERS'
const TOGGLE_IS_FETCHING = 'episodes/TOGGLE_IS_FETCHING'

const initialState = {
  episodes: [] as Array<EpisodeType>,
  isFetching: false
}

const episodesReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case GET_EPISODES:
      return {
        ...state,
        episodes: action.episodes.map((episode, index) => ({
          episodeId: index + 1,
          episodeCharactersNumber: episode.characters.length
        }))
      }
    case DELETE_EPISODE:
      return {
        ...state,
        episodes: state.episodes.filter((episode) => episode.episodeId !== action.episodeId)
      }
    case CHANGE_NUMBER_OF_CHARACTERS:
      return {
        ...state,
        episodes: state.episodes.map(episode => {
          if (episode.episodeId === action.episodeId) {
            if (action.mathAction === "add") {
              episode.episodeCharactersNumber++
            } else {
              if (episode.episodeCharactersNumber === 0) {
                return episode
              } else {
                episode.episodeCharactersNumber--
              }
            }
          }
          return episode
        })
      }
    case SORT_BY_NUMBER_OF_CHARACTERS:
      return {
        ...state,
        episodes: state.episodes.slice().sort((a, b) => {
          if (a.episodeCharactersNumber > b.episodeCharactersNumber) {
            return action.sortDirection === "asc" ? 1 : -1
          }
          if (a.episodeCharactersNumber < b.episodeCharactersNumber) {
            return action.sortDirection === "asc" ? -1 : 1
          }
          return 0;
        })
      }
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: action.isFetching}
    default:
      return state
  }
}

type ActionsType = SetEpisodesActionType | DeleteEpisodeActionType | ChangeNumberOfCharactersActionType
  | ToggleIsFetchingActionType | SortByNumberOfCharactersActionType

type SetEpisodesActionType = {
  type: typeof GET_EPISODES
  episodes: Array<{ characters: Array<string> }>
}

export const setEpisodes = (episodes: Array<{ characters: Array<string> }>): SetEpisodesActionType =>
  ({type: GET_EPISODES, episodes})

type DeleteEpisodeActionType = {
  type: typeof DELETE_EPISODE
  episodeId: number
}
export const deleteEpisode = (episodeId: number): DeleteEpisodeActionType =>
  ({type: DELETE_EPISODE, episodeId})

type ChangeNumberOfCharactersActionType = {
  type: typeof CHANGE_NUMBER_OF_CHARACTERS
  episodeId: number
  mathAction: "add" | "remove"
}
export const changeNumberOfCharacters = (episodeId: number, mathAction: "add" | "remove"): ChangeNumberOfCharactersActionType =>
  ({type: CHANGE_NUMBER_OF_CHARACTERS, episodeId, mathAction})

type SortByNumberOfCharactersActionType = {
  type: typeof SORT_BY_NUMBER_OF_CHARACTERS
  sortDirection: "asc" | "desc"
}
export const sortByNumberOfCharacters = (sortDirection: "asc" | "desc"): SortByNumberOfCharactersActionType =>
  ({type: SORT_BY_NUMBER_OF_CHARACTERS, sortDirection})

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType =>
  ({type: TOGGLE_IS_FETCHING, isFetching})

export type DispatchType = Dispatch<ActionsType>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestEpisodes = (): ThunkType => {
  return async (dispatch: DispatchType) => {
    dispatch(toggleIsFetching(true))
    const data = await episodesAPI.getEpisodes()
    dispatch(toggleIsFetching(false))

    dispatch(setEpisodes(data))
  }
}

export default episodesReducer