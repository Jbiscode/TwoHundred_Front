import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { instance } from '@api/index';
import FilterComponent from "@components/search/FilterComponent.jsx";
import HeaderComponent from "@components/search/HeaderComponent.jsx";
import SearchArticleComponent from "@components/search/SearchArticleComponent.jsx";
import BasicLayout from "@layouts/BasicLayout.jsx";
import useAuthStore from "@zustand/authStore";


function IndexPage() {
    const {id} = useAuthStore();

    const location = useLocation();
    const query1 = new URLSearchParams(location.search).get('content');
    const query2 = new URLSearchParams(location.search).get('category');

    const [articleDTO, setArticleDTO] = useState([]);
    const [likeArticle, setLikeArticle] = useState([]);

    const [content, setContent] = useState(query1 || '');
    const [category, setCategory] = useState(query2 ||'');
    const [tradeMethod, setTradeMethod] = useState('');
    const [tradeStatus, setTradeStatus] = useState('');
    const [orderBy, setOrderBy] = useState('latest');

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const query1 = new URLSearchParams(location.search).get('content');
        const query2 = new URLSearchParams(location.search).get('category');
        setContent(query1|| '');
        setCategory(query2 || '');
    }, [location.search])



    useEffect(() => {
        const fetchArticles = async (reset = false) => {
            let url = `/api/v1/search/total`;
            let params = [];
        
            if (orderBy) {
                params.push(`orderBy=${orderBy}`);
            }
            if (content) {
                params.push(`content=${content}`);
            }
            if (category) {
                params.push(`category=${category}`);
            }
            if (tradeMethod) {
                params.push(`tradeMethod=${tradeMethod}`);
            }
            if (tradeStatus == 'ON_SALE') {
                params.push(`tradeStatus=${tradeStatus}`);
            }
        
            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }
        
            try {
                const response = await instance.get(url);
                const data = response.data;
                if (typeof data === 'number') {
                    setTotalCount(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles(true);
    }, [category,content, orderBy, tradeMethod, tradeStatus]);


    const fetchArticles = async (reset = false, paging=1) => {
        if(loading) return;
        setLoading(true);
        let url = `/api/v1/search`;
        let params = [];
    
        if (orderBy) {
            params.push(`orderBy=${orderBy}`);
        }
        if (content) {
            params.push(`content=${content}`);
        }
        if (category) {
            params.push(`category=${category}`);
        }
        if (tradeMethod) {
            params.push(`tradeMethod=${tradeMethod}`);
        }
        if (tradeStatus == 'ON_SALE') {
            params.push(`tradeStatus=${tradeStatus}`);
        }
        if (id) {
            params.push(`id=${id}`);
        }
        params.push(`page=${reset? paging: page}`);
        params.push(`size=10`);
    
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
    
        const urlParams = params.filter(param => !param.startsWith('page=') && !param.startsWith('size='));
        window.history.replaceState(null, '', urlParams.length > 0 ? `?${urlParams.join('&')}` : '');
    
        try {
            const response = await instance.get(url);
            const data = response.data;
            if (Array.isArray(data.searchResult)) {
                setArticleDTO(prev => reset ? data.searchResult : [...prev, ...data.searchResult]);
                setLikeArticle(data.likeResult);
                console.log('likeArticle:', data.likeResult); 

                setHasMore(data.searchResult.length === 10);
            
            } else {
                console.error('Expected an array but got:', data);
                setHasMore(false); 
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setHasMore(false); 
        } finally {
            setLoading(false);
        }
    };
    
    //페이징
    useEffect(() => {
        setPage(1);
        fetchArticles(true);
    }, [content, orderBy, category, tradeMethod, tradeStatus, id]);
    
    useEffect(() => {
        if (page > 1) fetchArticles();
    }, [page]);

    return (
        <BasicLayout>
            <div className="!w-screen bg-white">
                <FilterComponent 
                    category={category} setCategory={setCategory} 
                    tradeMethod={tradeMethod} setTradeMethod={setTradeMethod} 
                    tradeStatus={tradeStatus} setTradeStatus={setTradeStatus} />
                <HeaderComponent 
                    orderBy={orderBy} setOrderBy={setOrderBy}
                    totalCount={totalCount} content={content} />
                <SearchArticleComponent 
                    content={content}
                    articleDTO={articleDTO} 
                    likeArticle={likeArticle} setLikeArticle={setLikeArticle}
                    hasMore={hasMore} setPage={setPage} loading={loading}/>
            </div>
        </BasicLayout>
    );
}

export default IndexPage;
