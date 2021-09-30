const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const commonTypeDefs = require('./common/TypeDefs');
const templateTypeDefs = require('./template/TypeDefs');
const templateResolvers = require('./template/Resolvers');
const deviceTypeDefs = require('./device/TypeDefs');
const deviceResolvers = require('./device/Resolvers');
const userResolvers = require('./user/Resolvers');
const userTypeDefs = require('./user/TypeDefs');


const query = [`
  type Query {
    #Get a template by Id
    template(id: Int!): Template
    #Checks if templates has Image Firmware and return a array with objects key-value, where key is a id template and value is a boolean.
    #The value is true if the template has image firmware.
    templatesHasImageFirmware(templatesId: [Int]!): [MapStringToString]
    #Returns a list of templates
    getTemplates(page: PageInput): TemplatesListPage
    #Returns a list of devices that can be divided in pages, and the information about how many pages there are in total, along with which page is being shown.
    #@param sortBy: set sortBy to ordenate list (default 'label')
    getDevices(page: PageInput, filter: FilterDeviceInput, sortBy: String): DeviceListPage
    #Finds device information by id
    getDeviceById(deviceId: String!): Device
    #Returns historical data in the format used by the Dashboard
    getDeviceHistoryForDashboard(filter: HistoryInput!, configs: ConfigsInput): String
    #Retrieves dashboard configuration by user. Returns the information if successful or error message if it occurs.
    getConfig(user:String, tenant:String!): String
  }
  type Mutation {
    #Updates existing information on database, or creates an entry if it doesn't exist. Returns success message if it works or error message if fails.
    updateConfig(user:String, tenant:String!, config: String!): String
    #Deletes a device. Returns the deleted device data if successful or error if fails.
    deleteDevice(deviceId: String!): Device
    #Deletes multiple devices. Returns all deleted devices data if successful or error if fails.
    deleteMultipleDevices(deviceIdArray: [String]!): [Device]
    #Favorite a device. Returns a boolean (true = device is favorite, false = device is not favorite) or error if fails.
    favoriteDevice(deviceId: String!, user: String, tenant: String!): Boolean
    #Favorite multiple devices. Returns an array booleans (true = device is favorite, false = device is not favorite) or error if fails.
    favoriteMultipleDevices(deviceIdArray: [String]!, user: String, tenant: String!): [Boolean]
  }
`];

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const typeDefs = [...query, ...templateTypeDefs, ...commonTypeDefs, ...deviceTypeDefs, ...userTypeDefs];
const resolvers = merge(templateResolvers, deviceResolvers, userResolvers);

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = executableSchema;
module.exports.typeDefs = typeDefs;
