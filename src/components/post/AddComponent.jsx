import { useState, useEffect } from "react";
import { auth } from "@api/index.js";
import axios from "axios";
import { addArticle } from "@api/apis.js";
import useAuthStore from "@zustand/authStore.js";
import useModalStore from "@zustand/modalStore.js";
import toast, { Toaster } from "react-hot-toast";

function AddComponent() {
    const loggedInUserId = useAuthStore((state) => state.getId());

    const { openLoginModal, closeLoginModal } = useModalStore((state) => state);

    const [imageFiles, setImageFiles] = useState([]);

    const [addr2Options, setAddr2Options] = useState([]);

    const [articleRequestDTO, setArticleRequestDTO] = useState({
        title: "",
        content: "",
        price: "",
        quantity: "",
        category: "",
        tradeMethod: "",
        tradeStatus: "ON_SALE",
        addr1: "",
        addr2: "",
        writerId: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        category: "",
        addr1: "",
        addr2: "",
        quantity: "",
        price: "",
        content: "",
        tradeMethod: "",
        images: "",
    });

    useEffect(() => {
        if (!loggedInUserId) {
            openLoginModal();
        }
    }, [loggedInUserId]);

    useEffect(() => {
        if (articleRequestDTO.addr1) {
            setAddr2Options(regions[articleRequestDTO.addr1]);
        } else {
            setAddr2Options([]);
        }
    }, [articleRequestDTO.addr1]);

    const handleChangeArticle = (e) => {
        if (!loggedInUserId) {
            openLoginModal();
            return;
        }
        setArticleRequestDTO({
            ...articleRequestDTO,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (e) => {
        const files = e.target.files;
        setImageFiles([...imageFiles, ...files]);
    };

    const handleImageRemove = (index) => {
        const updatedImageFiles = [...imageFiles];
        updatedImageFiles.splice(index, 1);
        setImageFiles(updatedImageFiles);
    };

    // 버튼을 누르면 실행되는 함수
    const handleClickAdd = async (e) => {
        e.preventDefault();

        // 유효성 검사
        let newErrors = {};
        if (!articleRequestDTO.title) {
            newErrors.title = "제목을 입력해주세요.";
        }
        if (!articleRequestDTO.category) {
            newErrors.category = "카테고리를 선택해주세요.";
        }
        if (!articleRequestDTO.addr1 || !articleRequestDTO.addr2) {
            newErrors.addr1 = "거래지역을 선택해주세요.";
        }
        if (!articleRequestDTO.quantity || articleRequestDTO.quantity <= 0) {
            newErrors.quantity = "수량을 올바르게 입력해주세요.";
        }
        if (!articleRequestDTO.price || articleRequestDTO.price <= 0) {
            newErrors.price = "가격을 올바르게 입력해주세요.";
        }
        if (!articleRequestDTO.content) {
            newErrors.content = "상품 설명을 입력해주세요.";
        }
        if (!articleRequestDTO.tradeMethod) {
            newErrors.tradeMethod = "거래방식을 선택해주세요.";
        }
        if (imageFiles.length === 0) {
            newErrors.images = "이미지를 최소 1개 등록해주세요.";
        } else if (imageFiles.length > 3) {
            newErrors.images = "이미지는 최대 3개까지 등록 가능합니다.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();

        formData.append(
            "articleRequestDTO",
            new Blob([JSON.stringify(articleRequestDTO)], {
                type: "application/json",
            })
        );

        if (imageFiles.length > 0) {
            for (var i = 0; i < imageFiles.length; i++) {
                formData.append("files", imageFiles[i]);
            }
        }

        try {
            const data = await addArticle(formData);
            toast.success("게시글이 성공적으로 작성되었습니다.");
            location.href = `/post/${data.data.id}`;
        } catch (error) {
            console.error("게시글 작성 실패:", error);
        }
    };

    const categories = [
        { name: "회원권", value: "MEMBERSHIP" },
        { name: "PT", value: "PT" },
        { name: "운동용품", value: "HEALTH_SUPPLIES" },
        { name: "운동기구", value: "HEALTH_EQUIPMENT" },
        { name: "음식", value: "FOOD" },
    ];

    const regions = {
        서울시: ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"],
        부산시: ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
        대구시: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
        인천시: ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
        광주시: ["동구", "서구", "남구", "북구", "광산구"],
        대전시: ["동구", "중구", "서구", "유성구", "대덕구"],
        울산시: ["중구", "남구", "동구", "북구", "울주군"],
        세종시: ["세종특별자치시"],
        경기도: ["수원시", "성남시", "의정부시", "안양시", "부천시", "광명시", "평택시", "동두천시", "안산시", "고양시", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
        강원도: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
        충청북도: ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
        충청남도: ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
        전라북도: ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
        전라남도: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
        경상북도: ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
        경상남도: ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
        제주도: ["제주시", "서귀포시"]
    };

    return (
        <div className="mx-auto w-fit bg-white py-8 px-20">
            <h2 className="text-2xl font-bold mb-4">상품정보</h2>
            <hr className="border-2 mb-2" />
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                    제목
                </label>
                <input
                    type="text"
                    id="name"
                    name="title"
                    value={articleRequestDTO.title}
                    onChange={handleChangeArticle}
                    className="input input-bordered w-full bg-white"
                    placeholder="상품 제목을 입력해주세요."
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                )}
            </div>
            <div className="mb-4">
                <p>상품 이미지</p>
                <div className="flex space-x-4">
                    {imageFiles.map((file, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Uploaded ${index}`}
                                className="w-24 h-24 object-cover border-2"
                            />
                            <button
                                onClick={() => handleImageRemove(index)}
                                className="mt-2 text-red-500"
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                    {imageFiles.length < 3 && (
                        <div className="flex flex-col items-center">
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer"
                            >
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                                        <span className="text-3xl">+</span>
                                    </div>
                                </div>
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                multiple={true}
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    )}
                </div>
                <p className="text-sm text-orange-400">
                    * 상품 이미지는 640x640에 최적화 되어 있습니다.
                    <br />
                    처음 등록하는 이미지는 대표이미지로 설정되며, 수정으로 변경되지 않습니다.
                    <br />
                    이미지는 최소 1개, 최대 3개까지 등록 가능합니다.
                </p>
                {errors.images && (
                    <p className="text-red-500 text-sm">{errors.images}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block mb-2">
                    카테고리
                </label>
                <select
                    name="category"
                    onChange={handleChangeArticle}
                    className="select select-bordered  w-full bg-white"
                >
                    <option value="">카테고리 선택</option>
                    {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="brand" className="block mb-2">
                    거래지역
                </label>
                <select
                    name="addr1"
                    onChange={handleChangeArticle}
                    className="select select-bordered bg-white w-1/2"
                >
                    <option value="">시/도 선택</option>
                    {Object.keys(regions).map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
                <select
                    name="addr2"
                    onChange={handleChangeArticle}
                    className="select select-bordered bg-white w-1/2"
                >
                    <option value="">시/군/구 선택</option>
                    {addr2Options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                {(errors.addr1 || errors.addr2) && (
                    <p className="text-red-500 text-sm">거래지역을 선택해주세요.</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block mb-2">
                    수량
                </label>
                <div className="flex">
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={articleRequestDTO.quantity}
                        onChange={handleChangeArticle}
                        className="input input-bordered w-24 bg-white"
                        placeholder="1"
                    />
                    <span className="ml-2 my-auto">개</span>
                </div>
                {errors.quantity && (
                    <p className="text-red-500 text-sm">{errors.quantity}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">
                    가격
                </label>
                <div className="flex">
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={articleRequestDTO.price}
                        onChange={handleChangeArticle}
                        className="input input-bordered w-full bg-white"
                        placeholder="숫자만 입력해주세요."
                    />
                    <span className="ml-2 my-auto">원</span>
                </div>
                {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                )}
            </div>
            <div className="mb-8">
                <textarea
                    id="content"
                    name="content"
                    value={articleRequestDTO.content}
                    onChange={handleChangeArticle}
                    rows={5}
                    className="textarea textarea-bordered w-full bg-white"
                    placeholder={"상품 설명을 입력해주세요."}
                />
                {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content}</p>
                )}
            </div>
            <div className="mb-4">
                <span>거래방식</span>
                <div className="flex space-x-4 mt-2">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input
                                type="radio"
                                name="tradeMethod"
                                value="FACE_TO_FACE"
                                checked={
                                    articleRequestDTO.tradeMethod ===
                                    "FACE_TO_FACE"
                                }
                                onChange={handleChangeArticle}
                                className="radio checked:bg-orange-400"
                            />
                            <span className="label-text ml-2">직거래</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input
                                type="radio"
                                name="tradeMethod"
                                value="DELIVERY"
                                checked={
                                    articleRequestDTO.tradeMethod === "DELIVERY"
                                }
                                onChange={handleChangeArticle}
                                className="radio checked:bg-orange-400"
                            />
                            <span className="label-text ml-2">택배거래</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input
                                type="radio"
                                name="tradeMethod"
                                value="NO_MATTER"
                                checked={
                                    articleRequestDTO.tradeMethod ===
                                    "NO_MATTER"
                                }
                                onChange={handleChangeArticle}
                                className="radio checked:bg-orange-400"
                            />
                            <span className="label-text ml-2">상관없음</span>
                        </label>
                    </div>
                </div>
                {errors.tradeMethod && (
                    <p className="text-red-500 text-sm">{errors.tradeMethod}</p>
                )}
            </div>
            <div className="flex justify-end">
                <button
                    className="btn btn-ghost bg-orange-400 text-white mb-10"
                    onClick={handleClickAdd}
                >
                    등록하기
                </button>
            </div>
        </div>
    );
}

export default AddComponent;
