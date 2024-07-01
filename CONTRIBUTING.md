# Contributing to Magistrala-sdk

We are open to, and deeply appreaciate any contributions from the community to magistrala-sdk.
This project adheres to the [Contributor Covenant 1.2](http://contributor-covenant.org/version/1/2/0).
By contibuting to Magistrala-sdk, you are expected to adhere to this code of conduct.

## Code style

Please follow the [node style guide](https://github.com/felixge/node-style-guide).

## Commit Messages

Please follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Reporting issues

Reporting issues are a great way to contribute to the project. We are perpetually grateful about a well-written,
thorough bug report.

Before raising a new issue, check [our issue
list](https://github.com/absmach/sdk-js/issues) to determine if it already contains the
problem that you are facing.

A good bug report shouldn't leave others needing to chase you for more information. Please be as detailed as possible. The following questions might serve as a template for writing a detailed
report:

- What were you trying to achieve?
- What are the expected results?
- What are the received results?
- What are the steps to reproduce the issue?
- In what environment did you encounter the issue?

## Pull requests

Good pull requests (e.g. patches, improvements, new features) are a fantastic help. They should
remain focused in scope and avoid unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g. implementing new features,
refactoring code etc.), otherwise you risk spending a lot of time working on something that the
maintainers might not want to merge into the project.

Please adhere to the coding conventions used throughout the project.

To contribute to the project, , [fork](https://help.github.com/articles/fork-a-repo/) it,
clone your fork repository, and configure the remotes:

```
git clone https://github.com/<your-username>/sdk-js.git
cd sdk-js
git remote add upstream https://github.com/absmach/sdk-js.git
```

If your cloned repository is behind the upstream commits, then get the latest changes from upstrem:

```
git checkout main
git pull --rebase upstream main
```
Create a new topic branch from `main` using the naming convention `MG-[issue-number]` to help us keep track of your contribution scope:

```
git checkout -b MG-[issue-number]
```
Commit your changes in logical chunks. When you are ready to commit,make sure
to write a Good Commit Message™.

Note that every commit you make must be signed. By signing off your work you indicate that you are accepting the [Developer Certificate of Origin](https://developercertificate.org/).

Use your real name (sorry, no pseudonyms or anonymous contributions). If you set your `user.name`
and `user.email` git configs, you can sign your commit automatically with `git commit -s`.

Locally merge (or rebase) the upstream development branch into your topic branch:

```
git pull --rebase upstream main
```

### Add a changeset 
These are used for version management and automated publishing. For an in-depth explanation on adding a changeset check [here](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md#i-am-in-a-single-package-repository). For more information on changesets check [here](https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md#a-detailed-explanation-of-changesets)

1. Run the command below

```
npx changeset
```
2. Select the appropriate bump type for the changes made

3. provide a message to go alongside the changeset. This will be written into the changelog when the next release occurs.


Push your topic branch up to your fork:

```
git push origin MG-[issue-number]
```

[Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title
and detailed description.

