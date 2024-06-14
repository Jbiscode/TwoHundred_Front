import useModalStore from '@zustand/modalStore';
import LoginModal from '@components/modal/LoginModal';
import SignupModal from '@components/modal/SignupModal';
import WriteReviewModal from '@components/modal/WriteReviewModal'
import Modal from '@components/templates/Modal';
import OfferModal from '@components/modal/OfferModal';


const ParentModal = () => {
  const { isLoginModalOpen, isSignupModalOpen, isWriteReviewModalOpen, closeLoginModal, closeSignupModal,closeWriteReviewModal, isOfferModalOpen, closeOfferModal } = useModalStore();
    
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
      <Modal isOpen={isOfferModalOpen} onClose={closeOfferModal}>
        <OfferModal />
      </Modal>
    </>
  );
};

export default ParentModal;