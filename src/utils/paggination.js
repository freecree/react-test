export const getTotalPages = function (totalCount, limit) {
    return Math.ceil(totalCount/limit);
}

export const getPagesNumsArr = function (totalPages) {
    return Array(totalPages).fill(0).map((v,i) => i+1);
}
