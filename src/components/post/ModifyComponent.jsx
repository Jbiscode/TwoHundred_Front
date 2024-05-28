

function ModifyComponent() {
  return (
      <div className="mx-auto w-fit bg-white py-8 px-20">
          <h2 className="text-2xl font-bold mb-4">상품정보</h2>
          <hr className="border-2 mb-2"/>
          <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                  상품명
              </label>
              <input
                  type="text"
                  id="name"
                  name="title"
                  className="input input-bordered w-full"
                  placeholder="상품 제목을 입력해주세요."
              />
          </div>
          <div className="mb-4">
              <p>상품 이미지</p>
              <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                      <label htmlFor="image-upload" className="cursor-pointer">
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
                          className="hidden"
                      />
                  </div>
              </div>
              <p className="text-sm text-orange-400">
                  * 상품 이미지는 640x640에 최적화 되어 있습니다.
                  <br/>
                  - 이미지는 상품등록 시 정사각형으로 잘려서 등록됩니다.
                  <br/>
                  최대 지원 사이즈인 640 X 640 으로 리사이즈 해서 올려주세요.
              </p>
          </div>
          <div className="mb-4">
              <label htmlFor="category" className="block mb-2">
                  카테고리
              </label>
              <input
                  type="text"
                  id="category"
                  name="category_code"
                  className="input input-bordered w-full"
                  placeholder="카테고리를 선택해주세요."
              />
          </div>
          <div className="mb-4">
              <label htmlFor="brand" className="block mb-2">
                  거래지역
              </label>
              <input
                  type="text"
                  id="brand"
                  name="trade_area"
                  className="input input-bordered w-full"
                  placeholder="동작구 사당동"
              />
          </div>
          <div className="mb-4">
              <span>상품상태</span>
              <div className="flex space-x-4 mt-2">
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <input
                              type="radio"
                              name="product_status_code"
                              value="USED"
                              className="radio checked:bg-orange-400"
                          />
                          <span className="label-text ml-2">중고상품</span>
                      </label>
                  </div>
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <input
                              type="radio"
                              name="product_status_code"
                              value="NEW"
                              className="radio checked:bg-orange-400"
                          />
                          <span className="label-text ml-2">새상품</span>
                      </label>
                  </div>
              </div>
          </div>
          <div className="mb-4">
              <span>거래방식</span>
              <div className="flex space-x-4 mt-2">
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <input
                              type="radio"
                              name="trade_method_code"
                              value="DIRECT"
                              className="radio checked:bg-orange-400"
                          />
                          <span className="label-text ml-2">직거래</span>
                      </label>
                  </div>
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <input
                              type="radio"
                              name="trade_method_code"
                              value="PARCEL"
                              className="radio checked:bg-orange-400"
                          />
                          <span className="label-text ml-2">택배거래</span>
                      </label>
                  </div>
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <input
                              type="radio"
                              name="trade_method_code"
                              value="ANY"
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
                    rows={5}
                    className="textarea textarea-bordered w-full"
                    placeholder={"상품 설명을 입력해주세요."}
                />
          </div>
          <div className="flex justify-end">
              <button
                  className="btn btn-ghost bg-orange-400 text-white mb-10 mr-1"
                  >
                  수정하기
              </button>
              <button
                  className="btn btn-ghost bg-orange-400 text-white mb-10"
                  >
                  삭제하기
              </button>
          </div>
      </div>
  );
}

export default ModifyComponent;