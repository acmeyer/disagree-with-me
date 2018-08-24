import React from 'react';
import Modal from 'react-modal';

class AppModal extends React.Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    const { isOpen, close, label, shouldCloseOnOverlayClick } = this.props;

    return (
      <Modal
        className="app-modal"
        isOpen={isOpen}
        contentLabel={label}
        onRequestClose={close}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        { isOpen ? this.props.children : null }
      </Modal>
    );
  }
}

export default AppModal;