import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateArticle } from "@api/apis.js";
import { instance } from "@api/index.js";
import { auth } from "@api/index.js";
import toast, { Toaster } from "react-hot-toast";
import useModalStore from "@zustand/modalStore.js";
import { categories, regins } from "@utils/postutils";

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
    const [errors, setErrors] = useState({});
    const { openCheckModal, closeCheckModal } = useModalStore((state) => state);
    const handleCancelDelete = () => {
        toast.success("삭제가 취소되었습니다.");
    };

    useEffect(() => {
        const fetchArticleDetail = async () => {
            try {
                const response = await instance.get(`/api/v1/articles/${aid}`, {
                    withCredentials: true,
                });

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
        if (index === 0) {
            toast.error("첫 번째 사진은 삭제할 수 없습니다.");
            return;
        }
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

        // 유효성 검사
        let newErrors = {};
        if (!articleRequestDTO.title) {
            newErrors.title = "제목을 입력해주세요.";
        }
        if (!articleRequestDTO.category) {
            newErrors.category = "카테고리를 선택해주세요.";
        }
        if (!articleRequestDTO.addr1) {
            newErrors.addr1 = "거래지역을 선택해주세요.";
        }
        if (!articleRequestDTO.addr2) {
            newErrors.addr2 = "거래지역을 선택해주세요.";
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
        if (imageUrls.length === 0 && imageFiles.length === 0) {
            newErrors.images = "이미지를 최소 1개 등록해주세요.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
            toast.success("게시글이 수정되었습니다.");
            setTimeout(() => {
                location.href = `/post/${aid}`;
            }, 500);
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

            if (response.resultCode === "200") {
                toast.success("게시글이 삭제되었습니다.");
                setTimeout(() => {
                    location.href = "/";
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
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
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                )}
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
                            {index !== 0 && (
                                <button
                                    onClick={() => handleImageRemove(index)}
                                    className="mt-2 text-red-500"
                                >
                                    삭제
                                </button>
                            )}
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
                    {imageUrls.length + imageFiles.length < 3 && (
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
                    - 이미지는 상품등록 시 정사각형으로 잘려서 등록됩니다.
                    <br />
                    처음 등록했던 이미지는 대표이미지로 설정되며 삭제가
                    불가능합니다.
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
                {(errors.addr1 || errors.addr2) && (
                    <p className="text-red-500 text-sm">
                        거래지역을 선택해주세요.
                    </p>
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
                        className="input input-bordered w-full"
                        placeholder="숫자만 입력해주세요."
                    />
                    <span className="ml-2">원</span>
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
                    className="textarea textarea-bordered w-full"
                    placeholder={"상품 설명을 입력해주세요."}
                />
                {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content}</p>
                )}
            </div>
            <div className="flex justify-between md:justify-end">
                <button
                    className="btn btn-ghost bg-gray-500 text-white mb-10 mr-1"
                    onClick={() => {
                        location.href = `/post/${aid}`;
                    }}
                >
                    돌아가기
                </button>
                <button
                    className="btn btn-ghost bg-violet-500 text-white mb-10 mr-1"
                    onClick={handleClickUpdate}
                >
                    수정하기
                </button>
                <button
                    className="btn btn-ghost bg-orange-500 text-white mb-10"
                    onClick={() =>
                        openCheckModal(handleDelete, handleCancelDelete)
                    }
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;
