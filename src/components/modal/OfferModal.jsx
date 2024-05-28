import React from "react";
import { Link } from "react-router-dom";

const OfferModal = () => {
    return (
        <div>
            <div className="text-center font-bold text-lg mb-6 mt-5">
                <p className="text-2xl mb-2">가격을 제시해 볼까요?</p>
                <p className="text-base text-gray-400 font-medium">당신의 제안이 마음에 든다면, 연락이 올 거에요!</p>
            </div>
            <div className="p-5">
                <form action="">
                    <div>
                        <div className="mb-6 flex justify-center items-center gap-4">
                            <p className="font-bold text-lg pl-1">제안가격</p>
                            <div >
                                <input type="text" placeholder="ex) 99,999" className="input input-bordered w-full" />
                            </div>
                        </div>
                      
                    </div>
                    <div className="flex justify-center">
                        <button className="btn btn-primary w-3/5 text-lg mb-3 font-bold">제안하기</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default OfferModal;
