# Data Formats

## Task Data (e.g. downloads from the service to the app)

### Sentences

The Service provides a list of sentence samples for the person to read aloud for recording and analysis.

The sentences are stored in a plain textfile on the server, CR delimited.  When a sentence task
is requested by the companion app, a sentence is randomly selected from this list.

Sentences can be added or removed simply by editing the text file with a standard text editor.
Since this file is stored in the service filesystem and the service is run from a docker container,
to have changes take effect, the docker container needs to be regenerated and published.

### Photos

The Service provides a set of image samples for the person to describe for recording and analsys.

The photos are stored in JPG files on the server under the folder 'photos'.
JPGs can be of different sizes, they are automatically resized for display by the client app.
When a photo task is requested by the companion app, a photo is randomly selected from this list of files.

Photos can be added or removed simply by changing the files in the photos directory.

## Upload Data

### Voice Data

Voice recordings are stored using 44 khz m4a stereo lossless audio.  Voice data is monitored for
quality issues on the companion app by measuring the background noice and the microphone saturation.

Uploaded data is stored as blobs with the naming convention of:

```
{UserId}_{TaskId}_{TimeStamp}.m4a
```

### Profile Data

Users are asked a few questions to add context to the voice analysis, developing a simple
profile about them.  This is a JSON file of questions &amp; answers stored under

```
{UserId}.profile
```
