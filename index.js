var fluid = require("infusion");
var kettle = require("kettle");
var kettleExceptionExamples = fluid.registerNamespace("kettleExceptionExamples");

fluid.defaults("kettleExceptionExamples.config", {
    gradeNames: "fluid.component",
    components: {
        server: {
            type: "kettle.server",
            options: {
                components: {
                    app: {
                        type: "kettle.app",
                        options: {
                            requestHandlers: {
                                exceptionInHandler: {
                                    route: "/in-handler",
                                    method: "get",
                                    type: "kettleExceptionExamples.exceptionInHandler.handler"
                                },
                                exceptionInCallback: {
                                    route: "/in-callback",
                                    method: "get",
                                    type: "kettleExceptionExamples.exceptionInCallback.handler"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

fluid.defaults("kettleExceptionExamples.exceptionInHandler.handler", {
    gradeNames: ["kettle.request.http"],
    invokers: {
        handleRequest: "kettleExceptionExamples.exceptionInHandler.handleRequest"
    }
});

kettleExceptionExamples.exceptionInHandler.handleRequest = function () {
    throw new Error("Exception in handler")
};

fluid.defaults("kettleExceptionExamples.exceptionInCallback.handler", {
    gradeNames: ["kettle.request.http"],
    invokers: {
        handleRequest: "kettleExceptionExamples.exceptionInCallback.handleRequest"
    }
});

kettleExceptionExamples.exceptionInCallback.handleRequest = function (request) {
    setTimeout(kettle.wrapCallback(function () {
        throw new Error("Exception in callback");
        request.events.onSuccess.fire("SUCCESS");
    }), 100);
};

kettleExceptionExamples.config();
