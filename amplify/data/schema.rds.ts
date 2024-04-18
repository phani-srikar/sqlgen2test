/* eslint-disable */
import { a } from "@aws-amplify/data-schema";
import { configure } from "@aws-amplify/data-schema/internals";
import { secret } from "@aws-amplify/backend";

export const schema = configure({
    database: {
        engine: "postgresql",
        connectionUri: secret("MYSQL_CONNECTION_STRING"),
        vpcConfig: {
            vpcId: "vpc-0a098072448e5785e",
            securityGroupIds: [
                "sg-08a7d84a50631d09b"
            ],
            subnetAvailabilityZones: [
                {
                    subnetId: "subnet-090736d761373d0de",
                    availabilityZone: "ap-northeast-2b"
                },
                {
                    subnetId: "subnet-0881d5c18a492da5c",
                    availabilityZone: "ap-northeast-2c"
                },
                {
                    subnetId: "subnet-0efe2f8967d55a44f",
                    availabilityZone: "ap-northeast-2a"
                },
                {
                    subnetId: "subnet-0e3013e39a28ecee6",
                    availabilityZone: "ap-northeast-2d"
                }
            ]
        }
    }
}).schema({
    "Blog": a.model({
        id: a.string().required(),
        content: a.string(),
        authors: a.string().array(),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier([
        "id"
    ]),
    "Post": a.model({
        id: a.string().required(),
        content: a.string(),
        blogId: a.string(),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier([
        "id"
    ]),
    "Profile": a.model({
        id: a.string().required(),
        details: a.string(),
        userId: a.string(),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier([
        "id"
    ]),
    "User": a.model({
        id: a.string().required(),
        name: a.string(),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier([
        "id"
    ])
});
