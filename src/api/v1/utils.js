const controllerHandler = (promise, params) => async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : [];
    try {
        const result = await promise(...boundParams);
        return res.json(result || { message: "OK" });
    } catch (e) {
        return next(e);
    }
};

const createPagination = (pageNumber, size, resourceCount) => {
    pageNumber = parseInt(pageNumber) || 1;
    size = parseInt(size) || 25;

    if (size < 1) {
        size = 25;
    } else if (size > 100) {
        size = 100;
    }

    const pageCount = Math.ceil(resourceCount / size);

    if (pageNumber < 1) {
        pageNumber = 1;
    } else if (pageNumber > pageCount) {
        pageNumber = pageCount;
    }

    return {
        pageCount,
        pageNumber,
        resourceCount,
        size,
    };
};

module.exports = {
    c: controllerHandler,
    createPagination,
};
