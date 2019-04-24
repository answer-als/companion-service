export const getHome = (request, response) => {

  if (request.hostname.startsWith('www.')) {

    // Chop off the www.
    response.redirect(301, request.protocol + '://' + request.hostname.slice(4));
    return;

  }

  response.render('home.hbs');

};
