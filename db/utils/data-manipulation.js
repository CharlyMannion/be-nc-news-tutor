// extract any functions you are using to manipulate your data, into this file

const formatTime = (articles) => {
    const formattedArticles = articles.map(({ created_at, ...rest }) => {
        return {...rest, created_at: new Date(created_at) }
    });
    return formattedArticles;
}

const createLookUp = (comments) => {
    return comments.reduce((lookUp, {belongs_to, comment_id}) => {
        lookUp[belongs_to] = comment_id;
        return lookUp;
    }, {})
}

module.exports = { formatTime, createLookUp };