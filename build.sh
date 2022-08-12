#! /bin/bash

yarn run build
aws s3 cp ./dist s3://example-app-dev-frontpagewebsitebucket-7wrtccd5p1qn --recursive
aws cloudfront create-invalidation --distribution-id E1H7FKDUCOQLE9 --paths /*
