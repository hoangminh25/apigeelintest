// Convert apigeelint JSON output to GitLab Code Quality format
const fs = require('fs');

const input = JSON.parse(fs.readFileSync('apigeelint-raw.json', 'utf8'));
const output = [];

// Map severity
const severityMap = {
  '0': 'info',
  '1': 'minor',
  '2': 'major',
  '3': 'critical'
};

input.forEach(file => {
  if (file.messages) {
    file.messages.forEach(msg => {
      output.push({
        description: `${msg.ruleId}: ${msg.message}`,
        check_name: msg.ruleId,
        fingerprint: `${file.filePath}:${msg.line}:${msg.ruleId}`,
        severity: severityMap[msg.severity] || 'major',
        location: {
          path: file.filePath.replace(/^.*\/apiproxy\//, 'apiproxy/'),
          lines: {
            begin: msg.line || 1
          }
        }
      });
    });
  }
});

fs.writeFileSync('code-quality-report.json', JSON.stringify(output, null, 2));
console.log(`Converted ${output.length} issues to GitLab Code Quality format`);
