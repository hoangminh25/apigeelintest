// Convert apigeelint JSON to SARIF format for GitHub Code Scanning
const fs = require('fs');

const input = JSON.parse(fs.readFileSync('apigeelint-raw.json', 'utf8'));

const sarif = {
  version: "2.1.0",
  $schema: "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
  runs: [{
    tool: {
      driver: {
        name: "apigeelint",
        version: "1.0.0",
        informationUri: "https://github.com/apigee/apigeelint"
      }
    },
    results: []
  }]
};

const levelMap = {
  '0': 'note',
  '1': 'warning',
  '2': 'error',
  '3': 'error'
};

input.forEach(file => {
  if (file.messages) {
    file.messages.forEach(msg => {
      sarif.runs[0].results.push({
        ruleId: msg.ruleId,
        level: levelMap[msg.severity] || 'warning',
        message: { text: msg.message },
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: file.filePath.replace(/^.*\/apiproxy\//, 'apiproxy/')
            },
            region: {
              startLine: msg.line || 1,
              startColumn: msg.column || 1
            }
          }
        }]
      });
    });
  }
});

fs.writeFileSync('apigeelint.sarif', JSON.stringify(sarif, null, 2));
console.log(`Converted ${sarif.runs[0].results.length} issues to SARIF format`);
