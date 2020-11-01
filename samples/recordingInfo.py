# You can sync the files to your local directory with:
#     az storage blob download-batch -d . -s companionservice
# And then run this script to download the matching friendly name and content type from the hashcodes

from os import listdir
import requests

fileNames = listdir('.')

for filename in fileNames:
    splitName = filename.split('-')

    if len(splitName) < 5:
        continue

    hashCodeIndex = len(splitName) - 4
    hashCode = splitName[hashCodeIndex]

    response = requests.get(url = "https://service-dev.answerals.org/api/v1/recording/" + hashCode)
    print(response.headers['Friendly-Name'] + ' ' + response.headers['Content-Type'])
