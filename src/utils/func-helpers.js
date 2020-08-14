export const scrollWindowToTop = ({ smooth }) =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? 'smooth' : undefined
  });

export const compare = (element1, element2, key) => {
  if (!element1[key] && element1[key] !== 0) return 1;
  if (!element2[key] && element2[key] !== 0) return -1;
  return JSON.stringify(element1[key]).localeCompare(JSON.stringify(element2[key]));
};

const getUrlVars = () => {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

export const getUrlParam = (parameter, defaultvalue) => {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
};
