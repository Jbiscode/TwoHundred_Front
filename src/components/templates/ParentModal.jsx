import useModalStore from '@zustand/modalStore';
import LoginModal from '@components/modal/LoginModal';
import SignupModal from '@components/modal/SignupModal';
import WriteReviewModal from '@components/modal/WriteReviewModal'
import Modal from '@components/templates/Modal';
import OfferModal from '@components/modal/OfferModal';
import MyReviewModal from '@components/modal/MyReviewModal';
import UpdateReviewModal from '@components/modal/UpdateReviewModal';


const ParentModal = () => {
  const { isLoginModalOpen, isSignupModalOpen, isWriteReviewModalOpen, closeLoginModal, closeSignupModal,closeWriteReviewModal, isOfferModalOpen, closeOfferModal, isReviewModalOpen, closeReviewModal, isUpdateReviewModalOpen, closeUpdateReviewModal } = useModalStore();
    
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
      <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal}>
        <MyReviewModal />
      </Modal>
      <Modal isOpen={isUpdateReviewModalOpen} onClose={closeUpdateReviewModal}>
        <UpdateReviewModal />
      </Modal>
    </>
  );
};

export default ParentModal;