class pagingHelper {
    static initializeResponse(list, count, size) {
        return {
            data: list,
            total: count,
            numberOfPages: Math.ceil(count / size)
        }
    }
}

module.exports = pagingHelper;