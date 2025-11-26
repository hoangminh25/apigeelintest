# Apigee Sample with apigeelint

Sample Apigee API proxy with GitLab CI pipeline for apigeelint validation.

## Structure
```
apigee-sample/
├── .gitlab-ci.yml          # GitLab CI pipeline
├── README.md               # This file
└── apiproxy/               # Apigee proxy
    ├── apiproxy.xml        # Proxy configuration
    ├── proxies/
    │   └── default.xml     # Proxy endpoint
    ├── policies/
    │   ├── AssignMessage.SetResponse.xml
    │   └── RaiseFault.InvalidRequest.xml
    └── targets/
        └── default.xml     # Target endpoint
```

## Usage

1. Push to GitLab:
```bash
cd /Users/dm-minh-hoang.dao/Downloads/apigee-sample
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-gitlab-repo-url>
git push -u origin main
```

2. GitLab CI will automatically run apigeelint on every commit

3. View results in:
   - Pipeline logs
   - Artifacts → apigeelint-results.txt

## Run locally
```bash
npm install -g apigeelint
apigeelint -s apiproxy -f table.js
```
# Test private repo
# Test with Advanced Security enabled
