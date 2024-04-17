import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { schema as auroraSchema } from './schema.rds';

/*== STEP 1 ===============================================================

The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
/*
const ddbSchema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      status: a.boolean(),
    })
    .authorization([a.allow.public()]),
});
*/

auroraSchema.setAuthorization((models) => [
  models.Blog.authorization([a.allow.public()]),
  models.Post.authorization([a.allow.public()]),
  models.User.authorization([a.allow.public()]),
  models.Profile.authorization([a.allow.public()]),
  // models.Blog.fields.content.authorization([a.allow.private()]),
  // models.User.fields.name.authorization([a.allow.owner()]),
]);

auroraSchema.models.Blog.addRelationships({
  post: a.hasOne('Post', ['blogId']),
});
auroraSchema.models.Post.addRelationships({
  blog: a.belongsTo('Blog', ['blogId']),
});

auroraSchema.models.User.addRelationships({
  post: a.hasMany('Profile', ['userId']),
});
auroraSchema.models.Profile.addRelationships({
  blog: a.belongsTo('User', ['userId']),
});

// const combinedSchema = a.combine([ddbSchema, auroraSchema]);

export type Schema = ClientSchema<typeof auroraSchema>;
export const data = defineData({
  // highlight-next-line
  schema: auroraSchema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
