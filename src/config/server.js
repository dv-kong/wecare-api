class Server {
    #http; // private
    constructor(http) {
        this.#http = http;
}

/** hover over the function to see the documentation
 * @func middlewares for each middleware, server will use the good one
 * @param middleware middleware function take the middleware in argument
 * 
*/
middlewares(middlewares) {
    for (const key in middlewares) {
       this.#http.use(middlewares[key]); 
    }
}

/**
 * @func routes server will use each route contained in the routes object
 * @param routes
 * @TODO param (routes)
 */
routes(routes) {
    for(const path in routes) {
        this.#http.use(path, routes[path]);
    }
}

/** 
 * @func errorHandler make the server the error handler
 * @param errorHandler custom class inheriting from Error
 */
errorHandler(errorHandler) {
    this.#http.use(errorHandler);
}
/**
 * @func start Start the server with the port in argument
 * @param port Value located in the .env file
 */
start(port){
    this.#http.listen(port, () => {
        console.log(`Server started on port: http://localhost:${port}`);
    });
}
}

export default Server;