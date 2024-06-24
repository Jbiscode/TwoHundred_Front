import React from "react";
import useModalStore from "@zustand/modalStore.js";

const CheckModal = () => {
    const { closeCheckModal, onConfirm, onCancel }  = useModalStore((state) => state);

    const handleConfirm = () => {
        onConfirm();
        closeCheckModal();
    };

    const handleCancel = () => {
        onCancel();
        closeCheckModal();
    };

    return (
        <div>
            <div className="text-center font-bold text-lg mb-6 mt-5">
                <p className="text-2xl mb-2">게시글을 삭제하시겠습니까?</p>
                <p className="text-base text-gray-400 font-medium">
                    삭제된 게시글은 복구할 수 없습니다.
                </p>
            </div>
            <div className="p-5">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleConfirm}
                        className="btn btn-primary w-2/5 text-lg mb-3 font-bold"
                    >
                        확인
                    </button>
                    <button
                        onClick={handleCancel}
                        className="btn btn-outline w-2/5 text-lg mb-3 font-bold"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckModal;
