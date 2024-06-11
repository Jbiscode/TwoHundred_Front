import useModalStore from '@zustand/modalStore';
import LoginModal from '@components/modal/LoginModal';
import SignupModal from '@components/modal/SignupModal';
import WriteReviewModal from '@components/modal/WriteReviewModal'
import Modal from '@components/templates/Modal';


const ParentModal = () => {
  const { isLoginModalOpen, isSignupModalOpen, isWriteReviewModalOpen, closeLoginModal, closeSignupModal,closeWriteReviewModal } = useModalStore();
    
  return (
    <>
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginModal />
      </Modal>
      <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal}>
        <SignupModal />
      </Modal>
      <Modal isOpen={isWriteReviewModalOpen} onClose={closeWriteReviewModal}>
        <WriteReviewModal />
      </Modal>
    </>
  );
};

export default ParentModal;