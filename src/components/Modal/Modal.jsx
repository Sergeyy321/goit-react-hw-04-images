import { Component } from 'react';
import { Modalstyle, Overlay } from 'components/Modal/Modal.styled'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    selectedImage: PropTypes.string,
    tags: PropTypes.string,
    onClose: PropTypes.func,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'hidden';
  
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'visible';
  
  }

  onBackdropClick = el => {
    if (el.target === el.currentTarget) {
      this.props.onModalClose();
    }
  };
  onKeyDown = el => {
    if (el.code === 'Escape') {
      this.props.onModalClose();
    }
  };
  render() {
       const { selectedImage, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <Modalstyle>
          <img src={selectedImage} alt={tags} />
        </Modalstyle>
      </Overlay>,
      modalRoot
    );
  }
};
