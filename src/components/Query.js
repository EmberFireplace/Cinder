let authorizationHeader = "Bearer fnAEbqCmntAAR9gdue3MMJ7lQnqRUmB1mSq52jaN";
let endpoint = "https://graphql.us.fauna.com/graphql";

/**
 * Function throws error if a invalid json is passed and returns null
 * @param queryJson - a Json defining the query, the arguments, and the function to process
 * @returns {Promise<any>} - a promise that resolves when the json request goes through to the internet.
 */
export async function doPost (queryJson) {
    if(!isValidGraphqlQuery(queryJson)) {
        return null;
    }
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization' : authorizationHeader},
        body: JSON.stringify(
            queryJson
        )
    })

    const json = await res.json()
    const result = json;
    console.log(JSON.stringify(result));
    return result;
}

/**
 *
 * @param queryJson - the json to test, also logs an error
 * @returns {boolean} - a boolean if it is a valid query or not.
 */
function isValidGraphqlQuery(queryJson) {
    if(!"query" in queryJson) {
        console.error("missing 'query' field in doPost function in Query.js");
        return false;
    }
    if(!"operationName" in queryJson) {
        console.error("missing 'operationName' field in doPost function in Query.js");
        return false;
    }
    if(!"variables" in queryJson) {
        console.error("missing 'variables' field in doPost function in Query.js");
        return false;
    }
    //TODO figure out how to test if the variables are all declared, if the operation name matches, etc.


    return true;
}