const { ApolloServer, gql } = require("apollo-server");
//const { GraphQLScalarType } = require("graphql");
//const { Kind } = require("graphql/language");
const mongoose = require("mongoose");
const { userDB, passwordDB } = require("../supersecret");

mongoose.connect(`mongodb+srv://${userDB}:${passwordDB}@cluster0-yjgfz.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
        id: ID
        title: String
        order: Int
    }

    input UserInput {
        id: ID
        firstName: String
        lastName: String
    }

    input TaskTypeInput {
        id: ID
        title: String
    }

    input TaskInput {
        id: ID
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
        addTaskStatus(status: TaskStatusInput!): [TaskStatus]
        updateTaskStatus(status: TaskStatusInput!): [TaskStatus]
        deleteTaskStatus(id: ID!): [TaskStatus]
        addUser(user: UserInput!): [User]
        updateUser(user: UserInput!): [User]
        deleteUser(id: ID!): [User]
        addTaskType(type: TaskTypeInput!): [TaskType]
        updateTaskType(type: TaskTypeInput!): [TaskType]
        deleteTaskType(id: ID!): [TaskType]
        addTask(task: TaskInput!): [Task]
        updateTask(task: TaskInput!): [Task]
        deleteTask(id: ID!): [Task]
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
        addTaskStatus: async (_, { status }) => {
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
        updateTaskStatus: async (_, { status }) => {
            try {
                const updateTaskStatus = await TaskStatus.findById(status.id);
                await updateTaskStatus.update({ ...status });

                const allTaskStatuses = await TaskStatus.find();
                return allTaskStatuses;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        deleteTaskStatus: async (_, { id }) => {
            try {
                const deleteTaskStatus = await TaskStatus.findById(id);
                await deleteTaskStatus.delete();

                const allTaskStatuses = await TaskStatus.find();
                return allTaskStatuses;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        addUser: async (_, { user }) => {
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
        updateUser: async (_, { user }) => {
            try {
                const updateUser = await User.findById(user.id);
                await updateUser.update({ ...user });

                const allUsers = await User.find();
                return allUsers;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        deleteUser: async (_, { id }) => {
            try {
                const deleteUser = await User.findById(id);
                await deleteUser.delete();

                const allUsers = await User.find();
                return allUsers;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        addTaskType: async (_, { type }) => {
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
        updateTaskType: async (_, { type }) => {
            try {
                const updateTaskType = await TaskType.findById(type.id);
                await updateTaskType.update({ ...type });

                const allTaskType = await TaskType.find();
                return allTaskType;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        deleteTaskType: async (_, { id }) => {
            try {
                const deleteTaskType = await TaskType.findById(id);
                await deleteTaskType.delete();

                const allTaskType = await TaskType.find();
                return allTaskType;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        addTask: async (_, { task }) => {
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
        },
        updateTask: async (_, { task }) => {
            try {
                const updateTask = await Task.findById(task.id);
                await updateTask.update({ ...task });

                const allTasks = await Task.find();
                return allTasks;
            } catch (error) {
                console.log("error", error);
                return [];
            }
        },
        deleteTask: async (_, { id }) => {
            try {
                const deleteTask = await Task.findById(id);
                await deleteTask.delete();

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
