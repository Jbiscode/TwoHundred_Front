import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const PostModal = ({setUserSignupDTO}) => {
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
      let fullAddress = data.sigungu;

      let extraAddress = '';
      
      if (data.addressType === 'R') {
          if (data.bname !== '') {
              extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
              extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
      
      const cleanedAddress = fullAddress.replace(/[^\w\s가-힣]/g, ' ').trim();
      
      const [addr1, addr2] = cleanedAddress.split(' ').filter(Boolean);
      setUserSignupDTO(prev => ({
        ...prev,
        addr1,
        addr2
      }));
      };
    
      const handleClick = () => {
        open({ onComplete: handleComplete });
      };
    
      return (
        <button className="btn btn-primary" type='button' onClick={handleClick}>
          주소 검색
        </button>
      );
}

export default PostModal;