module.exports = {
    mockRequest: () => {
        let req = {};
        req.body = jest.fn().mockReturnValue(req);
        req.params = jest.fn().mockReturnValue(req);
        return req;
    },
    mockResponse: () => {
        let res = {};
        res.end = jest.fn().mockReturnValue(res);
        res.writeHead = jest.fn().mockImplementation((status) => {
            res.status = status;
        });
        res.end = jest.fn().mockImplementation((json) => {
            res.body = json;
        });
        res.setHeader = jest.fn().mockReturnValue(res);
        return res;
    }
}