import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

import {AppStateType} from "../redux/store";

export type EpisodeType = {
  episodeId: number
  episodeCharactersNumber: number
}

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>