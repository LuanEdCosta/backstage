const TypeDefs = [`
#Necessary informations about device#
type Device {
    id: String!
    label: String!
    attrs: [Attr]
    created: String!
    updated: String
 }
 #Value types used by the platform#
 enum ValueType {
    NUMBER
    STRING
    BOOLEAN
    GEO
    UNDEFINED
 }
 #Necessary data about and attribute of a device#
 type Attr {
    label: String!
    valueType: ValueType!
    isDynamic: Boolean!
    staticValue: String
 }

#A paginated list of Devices.#
 type DeviceListPage {
    totalPages: Int!
    currentPage: Int!
    devices: [Device]
 }
#Determines which page to show and how many items#
 input PageInput {
    #set the page number to be accessed (default 20) #
    number: Int
    #set the number of elements to be shown in a page (default 1) #
    size: Int
 }

 #Return only devices that are named accordingly (prefix or suffix match)#
 input FilterDeviceInput {
    label: String
 }
 #Parameters to query historical device data#
 input HistoryInput {
    #list of devices which attributes will be retrieved#
    devices: [HistoryDeviceInput]!
    templates: [HistoryTemplateInput]
    dateFrom: String
    dateTo: String
    #lastN will be used to obtain the values from the lastN of most current values, minutes, hours, days and months according to option operationType
    lastN: Int
 }

 input ConfigsInput {
    #operationType corresponds to 0 (the last N histories, Number of most current values), 1 (minutes, the last N minutes), 2 (hours, the last N hours), 3 (days, the last N days), 4 (months, the last N months), 7 (to get devices by template)
    operationType: Int
    #corresponds to 0 (DEVICE) and 1 (TEMPLATE)
    sourceType: Int
    #corresponds to 0 (DEFAULT), 1 (MAP) and 2 (TABLE)
    widgetType: Int
 }

 #Parameters to identify from which device and which attributes to retrieve historical data from#
 input HistoryDeviceInput{
    #device selected#
    deviceID: String!
    #attributes which readings are to be retrieved#
    dynamicAttrs: [String]
    staticAttrs: [String]
 }
 #Parameters to identify from which template and which attributes to retrieve historical data from#
 input HistoryTemplateInput{
    #template selected#
    templateID: String!
    #attributes which readings are to be retrieved#
    dynamicAttrs: [String]
    #static attributes which readings are to be retrieved#
    staticAttrs: [String]
 }
 #Historical reading from an attribute#
 type HistoryAttr {
    label: String!
    valueType: ValueType!
    value: String!
    timestamp: String!
 }
 #Historical reading from device#
 type History{
    deviceID: String!
    label: String!
    attrs: [HistoryAttr]
 }
`];

module.exports = TypeDefs;
