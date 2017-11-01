const defaultOptions = {
    timeout: 30 * 1000
};

const isAjax = (request) => {
    return request.getResponseHeader('content-type').indexOf('application/json') > -1;
}

const getErrorHandler = function (url) {
    return (request, error) => {
        var message;
        if (error) {
            message = error;
        } else if (!isAjax(request)) {
            message = request.responseText;
        } else {
            message = `${url} failed.`;
        }
        alert(message);
    }
};

const isSuccess = (status) => {
    return status >= 200 && status < 300;
}

const isClientError = (status) => {
    return status >= 400 && status < 500;
}

const ajax = function (method, url, options = {}) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();

        request.open(method, url);

        if (options.headers) {
            Object.keys(options.headers).
                forEach((header) => request.setRequestHeader(header, options.headers[header]))
        }

        request.timeout = defaultOptions.timeout;
        request.onerror = request.ontimeout = () => reject(request);
        request.onload = function () {
            const success = isSuccess(request.status);
            if (success || isClientError(request.status)) {
                if (request.responseText && isAjax(request)) {
                    request.responseObj = JSON.parse(request.responseText);
                }
                if (success) {
                    resolve(request.responseObj || request.responseText, request);
                } else {
                    reject(request);
                }
            }
        };

        try {
            const body = options.data ? JSON.stringify(options.data) : null;
            request.send(body);
        } catch (e) {
            reject(request, e);
        }
    });
};

const get = function (url, options = {}) {
    const promise = ajax('GET', url, options);
    if (options.silent !== false) {
        promise.catch(getErrorHandler(url));
    }
    return promise;
};

const post = function (url, data, options = {}) {
    options.headers = options.headers || {};

    if (!options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json';
    }

    options.data = data;

    const promise = ajax('POST', url, options);

    if (!options.silent) {
        promise.catch(getErrorHandler(url));
    }

    return promise;
};

module.exports = {
    get,
    post,
};