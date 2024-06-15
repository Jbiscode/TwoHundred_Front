import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateArticle } from "@api/apis.js";
import { instance } from "@api/index.js";
import { auth } from "@api/index.js";

function ModifyComponent() {
    const { aid } = useParams();
    const [articleRequestDTO, setArticleRequestDTO] = useState({
        title: "",
        content: "",
        price: "",
        quantity: "",
        category: "",
        tradeMethod: "",
        tradeStatus: "",
        addr1: "",
        addr2: "",
        writerId: "",
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [addr2Options, setAddr2Options] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchArticleDetail = async () => {
            try {
                const response = await instance.get(`/api/v1/articles/${aid}`, {
                    withCredentials: true,
                });
                console.log("response:", response);

                if (response.resultCode === "200") {
                    const articleData = response.data;
                    setArticleRequestDTO({
                        title: articleData.title,
                        content: articleData.content,
                        price: articleData.price,
                        quantity: articleData.quantity,
                        category: articleData.category,
                        tradeMethod: articleData.tradeMethod,
                        tradeStatus: articleData.tradeStatus,
                        addr1: articleData.addr1,
                        addr2: articleData.addr2,
                        writerId: articleData.writerId,
                    });
                    setImageUrls(articleData.imageUrls);
                }
            } catch (error) {
                console.error("게시글 상세 정보 조회 실패:", error);
            }
        };

        fetchArticleDetail();
    }, [aid]);

    useEffect(() => {
        if (articleRequestDTO.addr1) {
            setAddr2Options(regions[articleRequestDTO.addr1]);
        } else {
            setAddr2Options([]);
        }
    }, [articleRequestDTO.addr1]);

    const handleChangeArticle = (e) => {
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
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls.splice(index, 1);
        setImageUrls(updatedImageUrls);
    };

    const handleImageFileRemove = (index) => {
        const updatedImageFiles = [...imageFiles];
        updatedImageFiles.splice(index, 1);
        setImageFiles(updatedImageFiles);
    };

    const handleClickUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "articleRequestDTO",
            new Blob([JSON.stringify({ ...articleRequestDTO, imageUrls })], {
                type: "application/json",
            })
        );

        if (imageFiles.length > 0) {
            for (var i = 0; i < imageFiles.length; i++) {
                formData.append("files", imageFiles[i]);
            }
        }

        try {
            const response = await updateArticle(aid, formData);
            console.log(response);
        } catch (error) {
            console.error("게시글 수정 실패:", error);
        }
    };

    //게시글 삭제
    const handleDelete = async () => {
        try {
            const response = await auth.delete(`/api/v1/articles/${aid}`, {
                withCredentials: true,
            });
            console.log("response:", response);
            if (response.resultCode === "200") {
                console.log("게시글 삭제 성공");
            }
        } catch (error) {
            console.error(error);
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
        서울시: ["강남구", "강동구", "강북구", "강서구", "관악구"],
        경기도: ["수원시", "성남시", "안양시", "안산시", "용인시"],
        경상북도: ["포항시", "경주시", "김천시", "안동시", "구미시"],
    };

    return (
        <div className="mx-auto w-fit bg-white py-8 px-20">
            <h2 className="text-2xl font-bold mb-4">상품정보</h2>
            <hr className="border-2 mb-2" />
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                    상품명
                </label>
                <input
                    type="text"
                    id="name"
                    name="title"
                    value={articleRequestDTO.title}
                    onChange={handleChangeArticle}
                    className="input input-bordered w-full"
                    placeholder="상품 제목을 입력해주세요."
                />
            </div>
            <div className="mb-4">
                <p>상품 이미지</p>
                <div className="flex space-x-4">
                    {imageUrls.map((imageUrl, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={`https://kr.object.ncloudstorage.com/kjwtest/article/${imageUrl}`}
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
                    {imageFiles.map((file, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Uploaded ${index}`}
                                className="w-24 h-24 object-cover border-2"
                            />
                            <button
                                onClick={() => handleImageFileRemove(index)}
                                className="mt-2 text-red-500"
                            >
                                삭제
                            </button>
                        </div>
                    ))}
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
                            <span className="text-sm">이미지 등록</span>
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
                </div>
                <p className="text-sm text-orange-400">
                    * 상품 이미지는 640x640에 최적화 되어 있습니다.
                    <br />
                    - 이미지는 상품등록 시 정사각형으로 잘려서 등록됩니다.
                    <br />
                    최대 지원 사이즈인 640 X 640 으로 리사이즈 해서 올려주세요.
                </p>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block mb-2">
                    카테고리
                </label>
                <select
                    name="category"
                    value={articleRequestDTO.category}
                    onChange={handleChangeArticle}
                    className="select select-bordered w-full"
                >
                    <option value="">카테고리 선택</option>
                    {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="brand" className="block mb-2">
                    거래지역
                </label>
                <select
                    name="addr1"
                    value={articleRequestDTO.addr1}
                    onChange={handleChangeArticle}
                    className="select select-bordered w-1/2"
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
                    value={articleRequestDTO.addr2}
                    onChange={handleChangeArticle}
                    className="select select-bordered w-1/2"
                >
                    <option value="">시/군/구 선택</option>
                    {addr2Options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
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
                        className="input input-bordered w-24"
                        placeholder="1"
                    />
                    <span className="ml-2">개</span>
                </div>
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
                        className="input input-bordered w-full"
                        placeholder="숫자만 입력해주세요."
                    />
                    <span className="ml-2">원</span>
                </div>
            </div>
            <div className="mb-8">
                <textarea
                    id="content"
                    name="content"
                    value={articleRequestDTO.content}
                    onChange={handleChangeArticle}
                    rows={5}
                    className="textarea textarea-bordered w-full"
                    placeholder={"상품 설명을 입력해주세요."}
                />
            </div>
            <div className="flex justify-end">
                <button
                    className="btn btn-ghost bg-orange-400 text-white mb-10 mr-1"
                    onClick={handleClickUpdate}
                >
                    수정하기
                </button>
                <button
                    className="btn btn-ghost bg-orange-400 text-white mb-10"
                    onClick={handleDelete}
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;
