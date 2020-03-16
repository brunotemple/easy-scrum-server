const { ApolloServer, gql } = require("apollo-server");
//const { GraphQLScalarType } = require("graphql");
//const { Kind } = require("graphql/language");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0-yjgfz.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

const db = mongoose.connection;

const taskStatusSchema = new mongoose.Schema({
    title: String,
    order: Number
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

const taskTypeSchema = new mongoose.Schema({
    title: String
});

const taskSchema = new mongoose.Schema({
    description: String,
    ownerId: String,
    statusId: String,
    typeId: String,
    number: Number
});

const TaskStatus = mongoose.model("TaskStatus", taskStatusSchema);
const User = mongoose.model("User", userSchema);
const TaskType = mongoose.model("TaskType", taskTypeSchema);
const Task = mongoose.model("Task", taskSchema);

const typeDefs = gql`
    type TaskStatus {
        id: ID!
        title: String!
        order: Int!
    }

    type TaskType {
        id: ID!
        title: String!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
    }

    type Task {
        id: ID!
        description: String!
        ownerId: String
        statusId: String
        typeId: String
        number: Int!
    }

    input TaskStatusInput {
        title: String
        order: Int
    }

    input UserInput {
        firstName: String
        lastName: String
    }

    input TaskTypeInput {
        title: String
    }

    input TaskInput {
        description: String
        ownerId: String
        statusId: String
        typeId: String
        number: Int
    }

    type Query {
        allTaskStatus: [TaskStatus]
        allUsers: [User]
        allTaskType: [TaskType]
        allTasks: [Task]
    }

    type Mutation {
        addTaskStatus(status: TaskStatusInput): [TaskStatus]
        addUser(user: UserInput): [User]
        addTaskType(type: TaskTypeInput): [TaskType]
        addTask(task: TaskInput): [Task]
    }
`;

const resolvers = {
    Query: {
        allTaskStatus: async () => {
            try {
                const allTaskStatuses = await TaskStatus.find();
                return allTaskStatuses;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        allUsers: async () => {
            try {
                const allUsers = await User.find();
                return allUsers;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        allTaskType: async () => {
            try {
                const allTaskType = await TaskType.find();
                return allTaskType;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        allTasks: async () => {
            try {
                const allTasks = await Task.find();
                return allTasks;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        }
    },
    Mutation: {
        addTaskStatus: async (obj, { status }) => {
            try {
                await TaskStatus.create({
                    ...status
                });
                const allTaskStatuses = await TaskStatus.find();
                return allTaskStatuses;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        addUser: async (obj, { user }) => {
            try {
                await User.create({
                    ...user
                });
                const allUsers = await User.find();
                return allUsers;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        addTaskType: async (obj, { type }) => {
            try {
                await TaskType.create({
                    ...type
                });
                const allTaskType = await TaskType.find();
                return allTaskType;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        addTask: async (obj, { task }) => {
            try {
                await Task.create({
                    ...task
                });
                const allTasks = await Task.find();
                return allTasks;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("*************DATABASE CONNECTED*************");
    server
        .listen({
            port: process.env.PORT || 4000
        })
        .then(({ url }) => console.log(`Server started at ${url}`));
});
