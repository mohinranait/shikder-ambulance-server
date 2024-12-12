/**
 * Create slug for URL
*/
module.exports.createSlug = (text) => {
    if(!text){
        return;
    }
    return text
    .toLowerCase() 
    .trim() 
    .replace(/[\s]+/g, "-") 
    .replace(/[^\w-]+/g, "")
}