# 2bedone-PWA-frontend

## [Backend](github.com/leolazz/2bedone-PWA-backend)

2BeDone-PWA is a rebuild of my first project, but now as progressive web app using a new stack.

### Why I made this:

To rapidly learn Angular, Ionic, graphql, and Apollo. Furthermore, learn the difference of building a website/app that should be equally consumable in a desktop or mobile experience.

### Constraints & Challenges:

Learning a new stack while trying to complete the project quickly and make it feel different than the orignal version.

### Results:

Gained a solid and practical understanding of Angular, Ionic, GraphQl, and Apollo.

![screenshot-iphone](/images/2bedone-iphone.png)
![screenshot-calendar](/images/2bedone-web1.png)
![screenshot-calendar](/images/2bedone-web2.png)

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Build app for production

```bash
$ ionic build --prod
```

## Docker

- Run `$ ionic build --prod` to avoid a stale build product

```bash
$ docker build -t <ImageName>:<TagName> .

$ docker run -it -p 5001:80 --name <ContainerName> <ImageName>

```
