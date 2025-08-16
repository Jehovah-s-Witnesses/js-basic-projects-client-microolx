# js-basic-projects-client-microolx

## Should create client application using only vanilla js

### Pages:
- Login page(need validate and if all is good, should login user and redirect to ad page) (public page)
- Registration page(need validate and if all is good, should register, login and redirect user to ad page)(public page)
- Ads page. Should render all ads(In public status) and pagination. Can see logged in users and without login. Without login users cant apply on ad or add to favorites. Logged in can apply. After apply ad should be hidden(you can just refetch data for this page)(public and private page)
- My ads page. Should render all ads created by logged in user(with pagination). In this page you can create new ad(in draft or public status), edit(by popup form) and archive existing. All forms should have validation.
- Applied ads page. Should render with pagination all ads which was applied by this user.
- Favorites page. Should render with pagination all ads which was added to favorites. On this page you can unlike ad.
- Exit should clear token and redirect to login.

### Comments about code:
- Should have navigation header. For logged-in user, links should be `Ads`, `My ads`, `Applied ads`, `Favorites`, `Exit`. For guests it should have `Ads`, `Login`, `Registration`.
- For all styles use [bulma](https://bulma.io/). If you need your custom styles, create file and write styles in css. But try to use maximum from bulma
- For storing tokens create storage and use in all places for token it.
- For requests create [axios](https://axios-http.com/) instance. Create with [interceptors](https://axios-http.com/docs/interceptors). Store interceptors in `interceptor` folder inside `api` folder. You should have interceptor for inserting token to `Authorization` header and interceptor which should log out user if token has expired
- Store all routes in constants
- Need have similar logic for all components. I suggest you use method `.render()` in every component for consistently. Other methods you can create as you wish.
- Need create some resolution for routing. I want to have class `Router` with method `.initialize(routes)` where `routes` should have next structure: `[ { path: '/login', component: LoginPage } ]` and when we go to `/login` page your router logic should call method `.render` in your `LoginPage` component.

## Important note! If you dont know about correct structure or this comments about code, do working version and we refactor it together.

## Criteria:

- Resolve all errors in the file
- Ensure the code is properly formatted using ESLint (our [pipeline](https://github.com/rammfall-code/guidelines/blob/main/DICTIONARY.md#pipeline-a-pipeline-is-a-sequence-of-automated-steps-that-run-code-checks-it-is-triggered-in-github-after-code-is-pushed-the-pipeline-can-have-three-statuses-pending-checks-are-in-progress-failed-checks-did-not-pass-due-to-issues-like-incorrect-code-errors-or-failed-tests-and-passed-all-checks-were-successful) checks for this).
- The code must comply with the project [guidelines](https://github.com/rammfall-code/guidelines/blob/main/JS.md).
- Pass validation without any errors in [validator](https://validator.w3.org/nu/)
- Additionally, follow all [git guidelines](https://github.com/rammfall-code/guidelines/blob/main/GIT.md) to avoid issues.
