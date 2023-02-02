import {useMemo} from 'react';

export default function(totalCount, pageLimit) {
    const pagesNumsArr = useMemo(() => {
        const totalPages = Math.ceil(totalCount/pageLimit);
        if (!totalPages) return [];
        return Array(totalPages).fill(0).map((v,i) => i+1);
    }, [totalCount, pageLimit]);
    return pagesNumsArr;
}