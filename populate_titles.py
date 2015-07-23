import json
import urllib2
from BeautifulSoup import BeautifulSoup

def getTitle(entry):
    try:
        soup = BeautifulSoup(urllib2.urlopen(entry["url"]));
        title = soup.title.string
    except:
        title = None
    return title

with open("data/log.json") as f:
    log = json.loads(f.read())
    entries = log["log"]
    withtitles = [];
    for entry in entries:
        if entry["type"] == "page":
            entry["title"] = getTitle(entry)
        withtitles.append(entry);
    print(json.dumps({"log": withtitles},
        sort_keys=True, indent=4, separators=(',', ': ')))
