# Ethics Olympiad Platform

This repo contains the code for the ethics olympiad platform, which divided into three components. The first, `backend`, is a server built using FeathersJS for the api, Mongoose (with MongoDB Atlas) as the ORM, and PrimusJS for the transport layer. The second, `manager`, is a webapp built using React which functions as a weak CMS, allowing for user management, as well as content creation (ie Events, Cases, and so forth). Finally, `events`, the third component, is also a webapp built with React which allows for the consumption of the content created on the `manager` for the purpose of running Ethics Olympiad events.

## Repo Setup

This repo is setup using `yarn 3.2.0`, and relies heavily on the `workspaces` pattern. This is helpful especially in enabling the creation and use of the `types` utility package to ensure type-safety across the project.

## Testing and Development

All three components can be developed locally, provided `node` and `npm` are installed. By default, the backend will connect to the MongoDB Atlas instance used in production, however it can just as easily connect to a fresh MongoDB instance running on docker. In order to do this, modify the `mongodb` variable in `/backend/config/default.json`.
