import { create } from 'zustand';

const searchStore = create(

    (set) => ({
        category: null,
        tradeMethod: null,
        tradeStatus: null,
        isopenedFilter: false,
        orderBy: 'latest',
        setCategory: (category) => set({ category }),
        setTradeMethod: (tradeMethod) => set({ tradeMethod }),
        setTradeStatus: (tradeStatus) => set({ tradeStatus }),
        setIsopenedFilter: (isopenedFilter) => set({ isopenedFilter }),
        setOrderBy: (orderBy) => set({orderBy})
    })
)

export default searchStore;