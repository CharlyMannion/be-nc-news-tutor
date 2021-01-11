// extract any functions you are using to manipulate your data, into this file

const formatTime = (articles) => {
    const formattedArticles = articles.map(({ created_at, ...rest }) => {
        return {...rest, created_at: new Date(created_at) }
    });
    return formattedArticles;
}

const createLookUp = (articles) => {
    return articles.reduce((lookUp, {title, article_id}) => {
        lookUp[title] = article_id;
        return lookUp;
    }, {})
}

const formatComments = (comments, lookUp) => {
    if (comments.length < 1) return [];
    const formattedComments = [];
    const {created_by, created_at, belongs_to, ...rest} = comments[0];
    formattedComments.push({...rest, author: created_by, created_at: new Date(created_at), article_id: lookUp[belongs_to]});
    return formattedComments;
}

module.exports = { formatTime, createLookUp, formatComments };