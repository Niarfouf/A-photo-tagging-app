import { useState } from 'react';
import GamePreviewMouseOver from './GamePreviewMouseOver';
import PropTypes from 'prop-types';
import styles from './GamePreview.module.css';

export default function GamePreview({ game, click }) {
  const [hover, setHover] = useState(false);

  return (
    <section className={styles['game-selection']}>
      <h2>{game.name}</h2>
      <div
        className={styles['game-image-container']}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={
            hover
              ? `${styles['filter']} ${styles['visible']}`
              : styles['filter']
          }
        ></div>
        <img src={game.game_image_url} alt={game.name}></img>
        <GamePreviewMouseOver hover={hover} game={game} click={click} />
      </div>
    </section>
  );
}
GamePreview.propTypes = {
  game: PropTypes.object.isRequired,
  click: PropTypes.func,
};
GamePreview.defaultProps = {
  click: null,
};
