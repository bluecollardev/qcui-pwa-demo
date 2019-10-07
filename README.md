## Boilerplate and Sample App for a React / Redux e-commerce PWA

View the demo here: https://mec-demo.bluecollardev.com/

### Features / Benefits

Features

* React 16.6
* Redux
* Saga
* ES6 / ES7
* ImmutableJS
* PreCSS ( supports SASS-like markup in your CSS )
* PostCSS ( with CSS modules activated by default )
* Webpack 4
* Reselect
* i18n / i10n supports ( react-intl )
* Lazy Loading component supports
* Type Checking with Babel Type Check ( Flow syntax )
* ESLint for syntax check
* Jest and Enzyme for Unit testing

Workflow

* Development
  * Hot Module Reload during development
  * Built-in lightweight config system
  * Built-in fancy cli dashboard for reporting run time compile status
  * Built-in support for multiple device concurrent debugging
* Build / Production
  * Production bundle analyzing capability
  * CSS / HTML / JS minification / Image optimization when built
  * JS code duplication removal during built ( tree shaking capability )
* Deployment
  * Built-in git commit hook, helpful for CI/CD process
  * Built-in process to deploy files directly to S3 ( optional )
* Productivity
  * Highly configurable build and workflow system ( webpack )
  * Minimal setup time and allow you to invest into things that matters
  * Everything automatic, you just care about development, nothing else \o/ Yeah ?!

If you are interested, please read the `package.json` for all installed modules and plugins.

### Initialize your project

Now run the following commands in your terminal

**NOTE: You only need to run this once!**

```sh
$ npm install # This will install the necessary packages to use the app
```

**That's it!**


### To run the app in Development Mode

```sh
$ npm run dev
```

Wait about 30 seconds for your development environment to initialize.

When it finishes, open your browser and go to `http://localhost:8080/`

If you see the landing page, it means you have set up everything successfully.

### List of NPM Commands

```sh
$ npm run dev       # build and watch, but javascript not minified
$ npm run build     # build a minified production version
$ npm run build:s3  # build a minified production version, deploy it to S3 as a static app
$ npm run lint      # linting using ESLint
$ npm run test      # run all tests
$ npm run test:jest # run tests using Jest
$ npm run clean     # it runs before each build, so you don't need to
```

### License ?!
In theory, knowledge should be free, so please visit [wtfpl](http://www.wtfpl.net/) for this boilerplate license if you really care.
