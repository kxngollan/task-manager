const fetchURL = process.env.REACT_APP_API_URL;

// 1. Environment variables in create-react-app are injected into the bundle at build time. This is done by webpack
// 2. The environment variables are different from the node ones. They must have a REACT_APP prefix, see documentation
// 3. The .env for create-react-app environment variables can be commited to git, see documentation. Because it's not meant to
// contain secrets. It's just meant to provide configuration.
// 4. There is an order of precedence to .env files for the create-react-app environment varibles
//    + .env

export default fetchURL;
