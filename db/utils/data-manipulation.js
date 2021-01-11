// extract any functions you are using to manipulate your data, into this file

const formatTime = (articles) => {
    const formattedArticles = articles.map(({ created_at, ...rest }) => {
        return {...rest, created_at: new Date(created_at) }
    });
    return formattedArticles;
}

module.exports = { formatTime };