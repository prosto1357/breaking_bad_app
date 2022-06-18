import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";

import {requestEpisodes, sortByNumberOfCharacters} from "../../redux/episodes-reducer";
import {AppStateType} from "../../redux/store";
import Episode from "../Episode/Episode";
import {AppDispatch} from "../../types/types";

import styles from "./Episodes.module.css";

const Episodes: FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const episodesSelector = useSelector((state: AppStateType) => state.episodes)
  const {episodes, isFetching} = episodesSelector

  return (
    <>
      <h3>Список эпизодов сериала Breaking Bad</h3>
      {!episodes.length &&
      <button
        className={styles.request_div}
        disabled={isFetching}
        onClick={() => {
          dispatch(requestEpisodes())
        }}
      >
        Загрузить эпизоды
      </button>}
      {isFetching && <h3>Загрузка...</h3>}
      {!!episodes.length &&
      <>
        <button
          className={styles.sorting_div}
          onClick={() => {
            dispatch(sortByNumberOfCharacters("desc"))
          }}
        >
          Сортировать по убыванию количества персонажей
        </button>
        <button
          className={styles.sorting_div}
          onClick={() => {
            dispatch(sortByNumberOfCharacters("asc"))
          }}
        >
          Сортировать по возрастанию количества персонажей
        </button>
      </>}
      {episodes.map(episode => {
        const {episodeId, episodeCharactersNumber} = episode

        return (
          <Episode
            episodeId={episodeId}
            episodeCharactersNumber={episodeCharactersNumber}
            key={episodeId}
          />
        )
      })}
    </>
  )
}

export default Episodes
