# Workwithhonor.com

### Setup

To run the site locally run the following commands:

Install dependencies
```
bundle install
```

Fetch content
```
bundle exec middleman prismic
```

If you need a different release content fetch set the ENV variable
```
PRISMIC_RELEASE=BRANCH bundle exec middleman prismic
```

Run the test server
```
bundle exec middleman server
```
