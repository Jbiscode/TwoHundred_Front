import useModalStore from '@zustand/modalStore';
import LoginModal from '@components/modal/LoginModal';
import SignupModal from '@components/modal/SignupModal';
import Modal from '@components/templates/Modal';


const ParentModal = () => {
  const { isLoginModalOpen, isSignupModalOpen, closeLoginModal, closeSignupModal } = useModalStore();
    
  return (
    <>
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginModal />
      </Modal>
      <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal}>
        <SignupModal />
      </Modal>
    </>
  );
};

export default ParentModal;