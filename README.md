<div align="center">
  <img alt="logo" width="100%" src="assets/logo.png"/>
</div>

## Introduction

An app to test out your typing speed, save your progress and view statistics against them.

## Getting Started

1. Clone the project.

2. Add .env file

   ```bash
   NODE_ENV =
   NEXT_PUBLIC_URL =
   DATABASE_URL =health
   ```

3. Install the dependencies and run the complete project (nextjs, wundergraph, go server, database) using the below command:

   ```bash
   yarn install && yarn project
   ```

## What's inside?

`nextjs` - Frontend framework used to build what you see (PORT 3000)
<br/>
`server` - Go server to generate random words and sentences (PORT 5001)
<br />
`wundergraph` - GraphQL api platform (PORT 9991)
<br />
`database` - Postgres database (PORT 5432)
