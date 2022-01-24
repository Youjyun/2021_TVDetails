const convertNetworkError = () => Promise.reject({ error: "NETWORK_ERROR" });

const convertError = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((err) => Promise.reject(err));
};

export const fetchPopular = () => {
  const TMDB =
    "https://api.themoviedb.org/3/tv/popular?api_key=32d578124d1006c6027992cf09c4d9ef&language=en-US&page=1";
  return fetch(TMDB, {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const convertImdbIdtoId = (imdbId) => {
  const TMDB = `https://api.themoviedb.org/3/find/${imdbId}?api_key=32d578124d1006c6027992cf09c4d9ef&language=en-US&external_source=imdb_id`;
  return fetch(TMDB, {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const fetchRecommendation = (id) => {
  const TMDB = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=32d578124d1006c6027992cf09c4d9ef&language=en-US&page=1`;
  return fetch(TMDB, {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const fetchDetail = (id) => {
  const TMDB = `https://api.themoviedb.org/3/tv/${id}?api_key=32d578124d1006c6027992cf09c4d9ef&language=en-US`;
  return fetch(TMDB, {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const fetchOMDB = (keyword) => {
  const OMDB = "http://www.omdbapi.com/?type=series&apikey=b3bb38e1&s=";
  const url = OMDB + keyword;
  return fetch(url, {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const fetchLoginStatus = (username) => {
  return fetch("/session", {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const fetchLogin = (username) => {
  return fetch("/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ username }),
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const fetchLogout = () => {
  return fetch("/session", {
    method: "DELETE",
  })
    .catch(convertNetworkError)
    .then((response) => {
      return response.ok;
    });
};
export const fetchCommentsFromServer = (id) => {
  return fetch(`/comments/${id}`, {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const sendCommentToServer = (id, comment) => {
  return fetch("/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, comment: comment }),
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const updateCommentToServer = (id, comment) => {
  return fetch("/comments", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      comment: comment,
    }),
  })
    .catch(convertNetworkError)
    .then(convertError);
};

export const deleteCommentInServer = (id) => {
  return fetch(`/comments/${id}`, {
    method: "DELETE",
  })
    .catch(convertNetworkError)
    .then(convertError);
};
