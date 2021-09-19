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

Production: https://service.answerals.org/api/v1/

Staging: https://service-dev.answerals.org/api/v1/

Use scripts to deploy:

* `admin/deployTest.sh`
* `admin/deployProd.sh`

An `ssh` key needs to be placed in the `/home/andrew/.ssh/authorized-keys` file for both servers.

## Docker

### Docker environment variables

Use these as `docker` command line options:

* `-e AZURE_STORAGE_ACCOUNT=answeralsvoice`
* `-e AZURE_STORAGE_ACCESS_KEY={AZURE_KEY}`

or add them to a `.env` file and use `--env-file` with `docker`.

```
AZURE_STORAGE_ACCOUNT=answeralsvoice
AZURE_STORAGE_ACCESS_KEY={AZURE_KEY}
```

### Helpful Docker Commands
#### On Deployed Server
* `docker ps` - See running containers
* `docker logs {CONTAINER_ID}` - See logs for specific container
