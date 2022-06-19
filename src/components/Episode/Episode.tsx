import React, {FC} from "react";
import {useDispatch} from "react-redux";

import {actions} from "../../redux/episodes-reducer";
import {AppDispatch, EpisodeType} from "../../types/types";
import {declension} from "../../utils/declension";

import styles from "./Episode.module.css";

const Episode: FC<EpisodeType> = ({episodeId, episodeCharactersNumber}) => {
  const dispatch: AppDispatch = useDispatch()

  return (
    <div className={styles.container_div}>
      <div>
        <div className={styles.title_div}>{`Эпизод №${episodeId}`}</div>
        <div className={styles.character_div}>
          <div className={styles.count_div}>
            <div
              className={styles.sign_div}
              onClick={() => {
                dispatch(actions.changeNumberOfCharacters(episodeId, "remove"))
              }}
            >
              -
            </div>
            <div className={styles.number_div}>{episodeCharactersNumber}</div>
            <div
              className={styles.sign_div}
              onClick={() => {
                dispatch(actions.changeNumberOfCharacters(episodeId, "add"))
              }}
            >
              +
            </div>
            <div className={styles.character_noun_div}>{declension(episodeCharactersNumber)}</div>
          </div>
        </div>
      </div>
      <div
        className={styles.delete_div}
        onClick={() => {
          dispatch(actions.deleteEpisode(episodeId))
        }}>
        Удалить
      </div>
    </div>
  )
}

export default Episode
