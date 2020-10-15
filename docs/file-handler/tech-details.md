# File Handler Solution Tech Details

We built out file handler using [Nextjs](https://nextjs.org/), [React](https://reactjs.org/), and deployed on [Nodejs](https://nodejs.org/). This approach allows our SharePoint Framework developers to use their existing knowledgeto expand our catalog of solutions.

## Nextjs

Using Nextjs allows us to scale and leverage many of the capabilities we were looking for around React server side rendering, page routing, and rely on a widely used framework with broad community support.

## React

Our developers were already familiar with React from building our other SharePoint Framework solutions so it was an easy choice to use it within our file handler. Because we host the code we could choose any framework and runtime.

## Monaco Editor

We made sure to integrate the [Monaco Editor](https://github.com/Microsoft/monaco-editor) to ensure out users had a familiar interface when editing the markdown.

## Nodejs

We use Nodejs as a flexible runtime for our solution, allowing us to easily test locally while deploying via Vercel (creators of Nextjs) or our own hosting. Works great with small containers for maximum flexibility.

## More Information

To learn more of the technical details we encourage you to have a look at the [file handler solution folder](https://github.com/pnp/contoso/tree/main/filehandler) including [code tours](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) and detailed descriptions of the solution.


