import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {AppStateType, InferActionsTypes} from "./store";
import {episodesAPI} from "../api/api";
import {EpisodeType} from "../types/types";

const initialState = {
  episodes: [] as Array<EpisodeType>,
  isFetching: false
}

type InitialStateType = typeof initialState

type EpisodeObjectData = { characters: Array<string>, episode_id: number }

const episodesReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'episodes/SET_EPISODES':
      return {
        ...state,
        episodes: action.episodes.map((episode) => ({
          episodeId: episode.episode_id,
          episodeCharactersNumber: episode.characters.length
        }))
      }
    case 'episodes/DELETE_EPISODE':
      return {
        ...state,
        episodes: state.episodes.filter((episode) => episode.episodeId !== action.episodeId)
      }
    case 'episodes/CHANGE_NUMBER_OF_CHARACTERS':
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
    case 'episodes/SORT_BY_NUMBER_OF_CHARACTERS':
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
    case 'episodes/TOGGLE_IS_FETCHING':
      return {...state, isFetching: action.isFetching}
    default:
      return state
  }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
  setEpisodes: (episodes: Array<EpisodeObjectData>) => ({type: 'episodes/SET_EPISODES', episodes} as const),
  deleteEpisode: (episodeId: number) => ({type: 'episodes/DELETE_EPISODE', episodeId} as const),
  changeNumberOfCharacters: (episodeId: number, mathAction: "add" | "remove") => ({
    type: 'episodes/CHANGE_NUMBER_OF_CHARACTERS',
    episodeId,
    mathAction
  } as const),
  sortByNumberOfCharacters: (sortDirection: "asc" | "desc") => ({
    type: 'episodes/SORT_BY_NUMBER_OF_CHARACTERS',
    sortDirection
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'episodes/TOGGLE_IS_FETCHING', isFetching} as const)
}


export type DispatchType = Dispatch<ActionsType>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestEpisodes = (): ThunkType => {
  return async (dispatch: DispatchType) => {
    dispatch(actions.toggleIsFetching(true))
    const data = await episodesAPI.getEpisodes()
    dispatch(actions.toggleIsFetching(false))

    dispatch(actions.setEpisodes(data))
  }
}

export default episodesReducer