

class Errors {
    HandleError(error_dict, status_code) {
        if (error_dict.hasOwnProperty(status_code)) {
            return error_dict[status_code];
        } else {
            return errors[status_code];
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
            401: "Missing or invalid access token provided.",
            404: "A non-existent entity request.",
            400: "Failed due to malformed query parameters.",
        },
        create: {
            409: "Entity already exists.",
            401: "Missing or invalid access token provided.",
        },
        login: {
            404: "A non-existent entity request.",
            401: "Missing or invalid access token provided.",
            404: "A non-existent entity request.",
        },
        refresh_token: {
            404: "A non-existent entity request.",
            401: "Missing or invalid access token provided.",
        },
        update: {
            404: "Failed due to a non-existing user.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        update_user_tags:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        update_user_password:{
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        update_user_identity:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        update_user_owner:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
            404: "A non-existent entity request.",
        },
        get_all: {
            400: "Failed due to malformed query parameters.",
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
        },
        disable: {
            401: "Missing or invalid access token provided.",
        },
        enable: {
            401: "Missing or invalid access token provided.",
        },
        memberships:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed query parameters.",
        },
        authorise_user: {
            401: "Failed to perform authorisation.",
            400: "Failed due to malformed JSON.",
        },
    }

    groups= {
        get : {
            401: "Missing or invalid access token provided.",
            404: "A non-existent entity request.",
            400: "Failed due to malformed query parameters.",
        },

    }


}

export default Errors;
