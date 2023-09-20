
import {ButtonStyled } from 'components/Button/Button.styled'

export const Button = ({ onLoadMore }) => {
  return (
    <div>
      <ButtonStyled type="button" onClick={onLoadMore}>
        Load more
      </ButtonStyled>
    </div>
  );
};