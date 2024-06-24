import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "@api";
import DOWN from "@/assets/images/icon/sort-down-solid.svg"
import UP from "@/assets/images/icon/sort-up-solid.svg"

const ReviewItemComponent = ({item, reviewStatus}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncatedContent = {
        display: '-webkit-box', 
        WebkitBoxOrient: 'vertical', 
        overflow: 'hidden', 
        WebkitLineClamp: 2
    }

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const lines = item.content.split('\n')



    return (
           
        <div className="px-3 border-solid border-b-2 border-gray-300" key={item}>
            <div className="py-6">
                <div className="flex items-center mb-3 pl-2">
                    <div className="grow flex items-baseline gap-1">
                        <Link className="font-bold text-lx" to={`/users/${item.reviewerId}`}>{item.reviewerName}</Link>
                        <span className="text-orange-500 text-base font-semibold">Lv. {item.reviewerLevel}</span>
                    </div>
                    <div className="flex items-end">
                        <p className="text-gray-400 text-base">{item.timeAgo}</p>
                    </div>
                </div>
                <div className="font-bold text-lg">
                    <div className="flex"> 
                        <div className="p-2 rounded-xl text-base text-gray-400 border-solid border-gray-300 border flex items-center"><Link to={`/post/${item.articleId}`}>구매상품 &nbsp;|&nbsp; {item.articleTitle}</Link></div>
                    </div>
                    <p className="mt-3 pl-2 break-all whitespace-pre-wrap" style={!isExpanded ? truncatedContent : null}>
                        {item.content} 
                    </p>
                    <div className="flex justify-center relative">
                            {(item.content.length > 20 || lines.length > 2) && (
                                <button className="flex" onClick={handleExpand}>
                                    <img src={isExpanded ? UP : DOWN} className={`w-[24px] h-[24px] ${isExpanded ? 'mt-2 -mb-4' : ''} `} />
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
               
    )
}

export default ReviewItemComponent