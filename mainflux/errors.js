

class Errors {
    HandleError(error_dict, status_code) {
        if (error_dict.hasOwnProperty(status_code)) {
            return error_dict[status_code];
        } else {
            return "Unknown error";
        }
    }

    errors = {
        400: "Failed due to malformed JSON.",
        401: "Missing or invalid access token provided.",
        403: "Missing or invalid access token provided.",
        404: "A non-existent entity request.",
        409: "Entity already exists.",
        415: "Missing or invalid content type.",
        422: "Database can't process the request.",
        500: "Unexpected server-side error occurred.",
    };

    users = {
        get : {
            409: "failed to perform authentication over the entity",
        },
        create: {
            409: "entity already exists.",
        },
        login: {
            404: "A non-existent entity request.",
        },
        refresh_token: {
            404: "A non-existent entity request.",
        },
        update: {
            404: "Failed due to a non-existing user.",
        },
        get_all: {
            400: "Failed due to malformed query parameters.",
        },
        disable: {
            404: "Failed due to non-existing user.",
        },
        enable: {
            404: "Failed due to non-existing user.",
        },
        memberships:{
            400: "Failed due to malformed query parameters.",
        },
        authorise_user: {
            400: "Failed due to malformed JSON.",
        },

    }


}

export default Errors;
