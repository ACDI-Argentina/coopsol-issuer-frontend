const development = {
  endpoints: {
    backend: 'http://localhost:8080/'
  }
};

const qa = {
  endpoints: {
    backend: 'https://api.semillas.qa.didi.org.ar/'
  }
};

const next = {
  endpoints: {
    backend: 'https://api.semillas.next.didi.org.ar/'
  }
};

const alpha = {
  endpoints: {
    backend: 'https://api.semillas.alpha.didi.org.ar/'
  }
};

const test = {
  endpoints: {
    backend: 'http://localhost:3011' // FIXME: Set this
  }
};

const configs = {
  development,
  next,
  alpha,
  beta,
  production,
  test,
  qa,
};

let environment = window._env_ || process.env.ENVIRONMENT || 'development';

export const setEnvironment = customEnvironment => (environment = customEnvironment);

export const config = configs[environment];
