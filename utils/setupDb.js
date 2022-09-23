"use strict";

require("../config/index");
require("../config/db");
const {createTable,deleteTable} = require("../migrations/table");
const{dbSchema}=require("../schemas/db");
//console.log(dbSchema);
createTable(dbSchema);
//deleteTable(dbSchema.TableName);