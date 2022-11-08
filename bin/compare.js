import fs from "fs";
import path from "path";
import _ from "lodash";
import process from 'node:process';
import __dirname from 'path';

export default (filepath1, filepath2) => {
    const path1 = path.resolve(filepath1);
    const path2 = path.resolve(filepath2);
    const data1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));
    const data1Keys = Object.getOwnPropertyNames(data1).sort();
    const data2Keys = Object.getOwnPropertyNames(data2).sort();
    const result = {
            data1Changes: {},
            data2Changes: {}
    };
    data1Keys.map((keyName) => {
            if (_.has(data2, keyName)) {
                    if (data1[keyName] === data2[keyName]) {
                            result.data1Changes[`  ${keyName}`] = data1[keyName];
                    } else {
                            result.data1Changes[`- ${keyName}`] = data1[keyName];
                    }
            } else {
                    result.data1Changes[`- ${keyName}`] = data1[keyName];
            }
    });
    data2Keys.map((keyName) => {
            if (_.has(data1, keyName)) {
                    if (data1[keyName] !== data2[keyName]) {
                            result.data2Changes[`+ ${keyName}`] = data2[keyName];
                    }
            } else {
                    result.data2Changes[`+ ${keyName}`] = data2[keyName];
            }
    });
    let resultStr = '{\n';
    const data1Results = Object.entries(result.data1Changes);
    const data2Results = Object.entries(result.data2Changes);
    data1Results.forEach(([key, value]) => resultStr += `  ${key}: ${value}\n`);
    data2Results.forEach(([key, value]) => resultStr += `  ${key}: ${value}\n`);
    resultStr += '}'
    console.log(resultStr);
    return resultStr;
};
