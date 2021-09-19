# companion-service

The mission of [Answer ALS](https://www.answerals.org/) is to build the most comprehensive
clinical, genetic, molecular &amp; biochemical assessment of ALS, while openly sharing the
results with the global research community.

The Answer ALS Companion App is a mobile app for Android and iOS that enables people with ALS
to submit data on their symptoms and disease progression from their home to suppliment the data
collected during clinical visits.

This project, the Answer ALS Companion Service, stores voice files and other data collected by the
Answer ALS Companion apps for iOS and Android.

# Deployment

Use scripts to deploy:

* `admin/deployTest.sh`
* `admin/deployProd.sh`

Specify Docker environment variables as such, depending on the environment:
* `-e AZURE_STORAGE_ACCOUNT=answeralsvoice`
* `-e AZURE_STORAGE_ACCESS_KEY={AZURE_KEY}`

## Docker
### Helpful Docker Commands
#### On Deployed Server
* `docker ps` - See running containers
* `docker logs {CONTAINER_ID}` - See logs for specific container
