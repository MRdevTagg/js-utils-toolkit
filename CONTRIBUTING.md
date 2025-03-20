# Contributing to JS Utils Toolkit

Thank you for considering contributing to JS Utils Toolkit! This document outlines the process for contributing to this project.

## Development Process

1. Fork the repository
2. Clone your fork: `git clone https://github.com/mrdevtagg/js-utils-toolkit.git`
3. Create a branch: `git checkout -b my-feature-branch`
4. Make your changes
5. Build and test: `npm run build`
6. Commit your changes: `git commit -am 'Add new feature'`
7. Push to your fork: `git push origin my-feature-branch`
8. Create a Pull Request

## Coding Standards

- Follow the existing code style
- Add appropriate JSDoc comments
- Write tests for new features

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update documentation if needed
3. The PR should work for all supported Node.js versions
4. PRs need to be approved by at least one maintainer

## Adding a New Utility

If you're adding a new utility function:

1. Add it to the appropriate section in `generalUtils.js`
2. Add proper JSDoc comments with examples
3. Export it in `index.js` and `index.mjs`
4. Consider adding tests

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
